import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";
import "./style.css";

const VideoUpload = () => {
	const [video, setVideo] = useState([]);
	const [videoList, setVideoList] = useState([])
	const { getRootProps, getInputProps } = useDropzone({
		accept: "video/*",
		onDrop: (acceptedfiles) => {
			setVideo(
				acceptedfiles[0]
			);
			// console.log(acceptedfiles)
		},
	});
	// console.log(video.name)
const VideoListRef = ref(storage,"video/")
	const uploadVideo = () => {
		if (video == null) return;

		const imageRef = ref(storage, `videos/${v4()+video.name }`);
		uploadBytes(imageRef, video).then((snapshot) => {
			
			getDownloadURL(snapshot.ref).then((url) => {
				alert("video upload");
				setVideoList((pre) => [...pre,url])
			})
		});
		
	};
	
	useEffect(() => {
	 listAll(VideoListRef).then((response) => {
response.items.forEach((item) => {
  getDownloadURL(item).then((url) => {
    setVideoList((pre) => [...pre, url]);
  })
})
})
	}, [])
	
	return (
		<>
			<div className="dropArea" {...getRootProps()}>
				<input {...getInputProps()}
				
					onChange={(e) => {
						setVideo(e.target.files[0]);
					}}
				/>
				<p className="text">Upload Videos</p>
			</div>
				{JSON.stringify(video)}
			<button onClick={uploadVideo}>Upload Video</button>
		</>
	);
};

export default VideoUpload;
