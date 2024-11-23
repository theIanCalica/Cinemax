import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import client from "../../Utils/client";
import { formatDate, notifyError, notifySuccess } from "../../Utils/helpers";
import DatePicker from "react-multi-date-picker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Showtime = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentShowtime, setCurrentShowtime] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      movie_id: "",
      theater_name: "",
    },
  });
  const fetchShowtimes = async () => {
    try {
      const response = await client.get("showtimes");
      setShowtimes(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies and showtimes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await client.get("/movies");
        setMovies(
          response.data.map((movie) => ({
            label: movie.title,
            value: movie._id,
          }))
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchShowtimes();
    fetchMovies();
  }, []);

  // Submit handler
  const onSubmit = async (data) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `/showtimes/${currentShowtime}` : "/showtimes";
    console.log(method);
    console.log(url);
    setIsSubmitting(true);
    try {
      const response = await client({
        method,
        url,
        data: data,
      }).then((response) => {
        fetchShowtimes();
        setOpenModal(false);
        reset();
        if (response.status === 201) {
          notifySuccess("Successfully added!");
        } else if (response.status === 200) {
          notifySuccess("Successfully updated");
        }
      });
    } catch (error) {
      console.error("Error adding showtime:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    handleClose();

    // Extract values from selectedRow safely
    const showtimeId = selectedRow[0];
    const movie = selectedRow[2];
    const theater = selectedRow[3];
    const dates = selectedRow[4];

    if (!movie || !theater || !dates) {
      console.error("Invalid row data:", selectedRow);
      return;
    }

    // Populate form fields
    reset({
      movie_id: { label: movie.title, value: movie._id } || "",
      theater_name: { label: theater, value: theater } || "",
      dateRange: Array.isArray(dates)
        ? dates.map((dateObj) => new Date(dateObj.date)) // Convert to Date objects
        : [],
    });

    setValue("movie_id", { label: movie.title, value: movie._id });
    setValue("theater_name", { label: theater, value: theater });

    setCurrentShowtime(showtimeId); // Store the ID for update
    setIsEditMode(true); // Switch modal to edit mode
    setOpenModal(true); // Open modal
  };

  const handleDelete = async () => {
    handleClose();
    // console.log(selectedRow);
    const id = selectedRow[0];
    await client
      .delete(`showtimes/${id}`)
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Successfully deleted");
          fetchShowtimes();
        }
      })
      .catch((error) => {
        notifyError(error.data.message);
      });
  };
  // Table options
  const columns = [
    {
      name: "_id",
      label: "",
      options: {
        filter: false,
        display: false,
        sort: false,
      },
    },
    {
      name: "",
      label: "No.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1; // Row number starts at 1
        },
      },
    },
    {
      name: "movie",
      label: "Movie Title",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <Typography variant="body1">{value?.title || "N/A"}</Typography>
          );
        },
      },
    },
    {
      name: "theater",
      label: "Theater",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "showtimes",
      label: "Showtimes",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (showtimes) => {
          if (Array.isArray(showtimes) && showtimes.length > 0) {
            return showtimes.map((showtime, index) => (
              <Typography
                key={index}
                variant="body2"
                style={{
                  marginBottom: index === showtimes.length - 1 ? 0 : 4,
                  display: "block", // Each showtime on a new line
                }}
              >
                {`${formatDate(new Date(showtime.date).toLocaleDateString())} `}
              </Typography>
            ));
          }
          return "N/A";
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <Button
                aria-controls="actions-menu"
                aria-haspopup="true"
                onClick={(event) => handleClick(event, tableMeta.rowData)}
              >
                •••
              </Button>
              <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    selectableRows: "none",
    responsive: "standard",
    download: true,
    print: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    textLabels: {
      body: { noMatch: loading ? "Loading data..." : "No records found" },
    },
  };

  return (
    <div>
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add Showtime
        </Button>
      </Box>
      <MUIDataTable
        title="Showtimes"
        data={showtimes}
        columns={columns}
        options={options}
      />

      {/* Add Showtime Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h6" align="center" mb={3}>
            Add Showtime
          </Typography>

          {/* Movie Select */}
          <Controller
            name="movie_id"
            control={control}
            rules={{ required: "Movie is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={movies}
                placeholder="Select a Movie"
                isClearable
                styles={{
                  container: (provided) => ({
                    ...provided,
                    marginBottom: 16,
                    position: "relative",
                    zIndex: 2, // Lower than menuPortal
                  }),
                  control: (provided) => ({
                    ...provided,
                    zIndex: 2,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1001, // Ensure higher than the control
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9999, // Highest priority
                  }),
                }}
                menuPortalTarget={document.body} // Attach menu to body for higher control
              />
            )}
          />
          {errors.movie_id && (
            <Typography color="error">{errors.movie_id.message}</Typography>
          )}

          {/* Theater Select */}
          <Controller
            name="theater_name"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                options={[
                  { label: "Cinema 1", value: "Cinema 1" },
                  { label: "Cinema 2", value: "Cinema 2" },
                ]}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    marginBottom: 16,
                    position: "relative",
                    zIndex: 1, // Lower than the first Select
                  }),
                  control: (provided) => ({
                    ...provided,
                    zIndex: 1,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1000, // Lower than the first Select's menu
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9998, // Lower than the first Select's menuPortal
                  }),
                }}
                menuPortalTarget={document.body} // Attach menu to body for higher control
                placeholder="Select Theater"
              />
            )}
          />
          {/* DatePicker for Start and End Dates */}
          <Controller
            name="dateRange"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <DatePicker
                {...field}
                multiple
                placeholder="Select date range"
                format="YYYY/MM/DD"
                style={{
                  width: "100%", // Full width
                  height: "40px", // Match Material-UI height
                  padding: "8px 12px", // Add padding for a clean look
                  fontSize: "16px", // Font size matching Material-UI
                  border: "1px solid #ccc", // Subtle border
                  borderRadius: "4px", // Rounded corners
                  outline: "none", // Remove outline
                  boxSizing: "border-box", // Prevent padding issues
                }}
                // Ensure the onChange function is called correctly
                onChange={(dates) => {
                  // If the dates are moment.js objects, extract them in a format you need
                  const formattedDates = dates.map((date) =>
                    date.format("YYYY/MM/DD")
                  ); // format each date
                  field.onChange(formattedDates);
                }}
              />
            )}
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              sx={{ flex: 1 }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Showtime;
