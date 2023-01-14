// // import React, { useState, useCallback } from "react";
// // import { useDropzone } from "react-dropzone";
// // import { db, storage } from "../src/File Managers/firebase";
// // import { ref, uploadBytes } from "firebase/storage";

// // const Drop = () => {
// // 	const [selectedImages, setSelectedImages] = useState("");
// // 	// const UploadImage = () => {
// // 	// 	if (selectedImages == null) return;
// // 	// 	const imageRef = storage
// // 	// 		.ref("/images${image.name}")
// // 	// 		.put(selectedImages)
// // 	// 		.on("state_changed", alert("success"), alert);
// // 	// 		imageRef();
// // 	// };

// // 	console.log("db", db);
// // 	console.log("storage", storage);
// // 	const onDrop = useCallback((acceptedFiles) => {
// // 		setSelectedImages(
// // 			acceptedFiles.map((file) =>
// // 				Object.assign(file, {
// // 					preview: URL.createObjectURL(file),
// // 				})
// // 			)
// // 		);
// // 		console.log(acceptedFiles);
// // 	}, []);
// // 	const { getRootProps, getInputProps } = useDropzone({ onDrop });
// // 	const selected_files = selectedImages?.map((file) => (
// // 		<div>
// // 			<img src={file.preview} style={{ width: "200px" }} alt="" />
// // 		</div>
// // 	));
// // 	return (
// // 		<div>
// // 			<div {...getRootProps()}>
// // 				<input {...getInputProps()} />
// // 				<p>Drop the files here....</p>
// // 			</div>
// // 			<input type="text" placeholder="Enter a caption" />

// // 			{selected_files}
// // 		</div>
// // 	);
// // };

// // export default Drop;
// import React from 'react'
// import { AiOutlineCloudUpload  } from 'react-icons/fa';


// const Drop = () => {
//   return (
// 	<div className='drag-area'>
// 		<div>
// 			<div className='icon'><AiOutlineCloudUpload/></div>
// 			<header>Drag & Drop to Upload File</header>
// 			<span>OR</span>
// 			<header>Choose File</header>
// 		</div>

// 	</div>
//   )
// }

// export default Drop
import React from 'react'

const Drop = (props) => {
  return (
	<div>
		{/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Upload File
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
	</div>
  )
}

export default Drop;