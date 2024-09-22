import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond/dist/filepond.css"; // Import FilePond styles
import "./FilePondStyles.css"; // Import custom styles

// Register FilePond plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

const Try = () => {
  const [file, setFile] = useState([]);

  return (
    <div>
      <FilePond
        acceptedFileTypes={["image/*"]}
        file={file}
        onupdatefiles={setFile}
        allowMultiple={false}
        maxFiles={1}
        name="files"
        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
        imagePreviewHeight={170}
        imageCropAspectRatio="1:1"
        imageResizeTargetWidth={200}
        imageResizeTargetHeight={200}
        stylePanelLayout="compact circle"
        styleLoadIndicatorPosition="center bottom"
        styleButtonRemoveItemPosition="center bottom"
      />
    </div>
  );
};

export default Try;
