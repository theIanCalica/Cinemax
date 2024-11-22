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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import client from "../../Utils/client";
import { formatDate, notifyError, notifySuccess } from "../../Utils/helpers";

const Showtime = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentShowtime, setCurrentShowtime] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      movie_id: "",
      theater_name: "Cinema 1", // Default
      start_date: null,
      end_date: null,
    },
  });
  const fetchShowtimes = async () => {
    try {
      const response = await client.get("showtimes");
      setShowtimes(response.data.data);
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
    console.log(data);
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        show_date: dayjs(data.show_date).format("YYYY-MM-DD"), // Format date
      };
      const response = await client.post("/showtimes", formattedData);
      setShowtimes((prev) => [...prev, response.data]);
      setOpenModal(false);
      notifySuccess("Successfully added!");
      reset(); // Reset form after successful submission
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
    console.log("Edit clicked", selectedRow);
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
        // customBodyRender: (value, tableMeta) => {
        //   return tableMeta.rowIndex + 1; // Add 1 because rowIndex starts at 0
        // },
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1; // Add 1 because rowIndex starts at 0
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
          return value?.title || "N/A";
        },
      },
    },
    {
      name: "theater",
      label: "Theater",
      options: { filter: true, sort: true },
    },
    {
      name: "showDateRange",
      label: "Show Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if (value?.start && value?.end) {
            const startDate = new Date(value.start).toLocaleDateString();
            const endDate = new Date(value.end).toLocaleDateString();
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

            {/* Start Date Picker */}
            <Controller
              name="start_date"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
            {errors.start_date && (
              <Typography color="error">{errors.start_date.message}</Typography>
            )}

            {/* End Date Picker */}
            <Controller
              name="end_date"
              control={control}
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
            {errors.end_date && (
              <Typography color="error">{errors.end_date.message}</Typography>
            )}

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
    </LocalizationProvider>
  );
};

export default Showtime;
