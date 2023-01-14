import { CircularProgress  } from "@material-ui/core";
import { useState, useEffect } from "react";


function Progress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((newLevel) => (newLevel >= 100 ? 0 : newLevel + 20));
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
    <div style={{marginLeft: 300, marginTop: 10}}>

			<CircularProgress  style={{width: 40}}color="secondary" variant="determinate" value={progress }  />

 {/* <button onClick={Uploadfile}>Cllick</button> */}
  </div>
	);
}

export default Progress;
