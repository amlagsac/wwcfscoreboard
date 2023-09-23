import { Box, Container, Grid, Typography, Paper, Divider } from "@mui/material";
import { useEffect, useState } from "react";

const Scoreboard = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [shotClockSeconds, setShotClockSeconds] = useState(24);
    const [lightScore, setLightScore] = useState(0);
    const [darkScore, setDarkScore] = useState(0);
    const [timeoutLight, setTimeoutLight] = useState(5);
    const [timeoutDark, setTimeoutDark] = useState(5);
    const [foulLight, setFoulLight] = useState(0);
    const [foulDark, setFoulDark] = useState(0);
    const [possession, setPossession] = useState("");
    const [quarter, setQuarter] = useState(1);
    const [changeCourt, setChangeCourt] = useState(false);

    useEffect(() => {
        let timer;
        timer = setInterval(() => {
            const minutes = JSON.parse(localStorage.getItem('minutes'));
            const seconds = JSON.parse(localStorage.getItem('seconds'));
            const shotClockSeconds = JSON.parse(localStorage.getItem('shotClockSeconds'));
            const lightScore = JSON.parse(localStorage.getItem('lightScore'));
            const darkScore = JSON.parse(localStorage.getItem('darkScore'));
            const possession = JSON.parse(localStorage.getItem('possession'));
            const timeoutLight = JSON.parse(localStorage.getItem('timeoutLight'));
            const timeoutDark = JSON.parse(localStorage.getItem('timeoutDark'));
            const foulLight = JSON.parse(localStorage.getItem('foulLight'));
            const foulDark = JSON.parse(localStorage.getItem('foulDark'));
            const quarter = JSON.parse(localStorage.getItem('quarter'));
            const changeCourt = JSON.parse(localStorage.getItem('changeCourt'));
            setMinutes(minutes);
            setSeconds(seconds);
            setShotClockSeconds(shotClockSeconds);
            setLightScore(lightScore);
            setDarkScore(darkScore);
            setPossession(possession);
            setTimeoutLight(timeoutLight);
            setTimeoutDark(timeoutDark);
            setFoulLight(foulLight);
            setFoulDark(foulDark);
            setQuarter(quarter);
            setChangeCourt(changeCourt);
        }, 100) 
        return () => clearInterval(timer);
    }, [minutes, seconds, shotClockSeconds, lightScore, darkScore, possession, foulLight, foulDark, quarter, changeCourt])

    return(
        <>
          <Container disableGutters maxWidth="false" sx={{ p: 0 }}>
            <Paper square elevation={6} sx={{ height: 'inherit', minHeight: "100vh", backgroundColor: '#242525'}}>
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} display={"flex"}>
                {
                  changeCourt 
                  ?
                  <div style={{ marginLeft: "auto", display: "flex" }}>
                      <div className={`button-arrow left`} style={{ margin: "auto 0px", borderColor: possession === "Dark" ? "transparent transparent transparent #FF0000" : ""}}></div>
                      <Typography variant="h4" sx={{ fontFamily: "digital-7", my: "auto", mx: 1, color: "#FFFFFF", fontWeight: 900}}>POS</Typography>
                    </div>
                  :
                  <div style={{ marginLeft: "auto", display: "flex" }}>
                      <div className={`button-arrow left`} style={{ margin: "auto 0px", borderColor: possession === "Light" ? "transparent transparent transparent #FF0000" : ""}}></div>
                      <Typography variant="h4" sx={{ fontFamily: "digital-7", my: "auto", mx: 1, color: "#FFFFFF", fontWeight: 900}}>POS</Typography>
                  </div>
                }
                  <Box sx={{ px: 8, mx: "auto", border: 1, borderColor: "white", borderWidth: 5, borderTop: "none", borderRadius: 2}} justifyContent="center" alignContent="center" display={"flex"} bgcolor={'#000000'}>
                    <Typography className="red_shadow" variant="h2" sx={{ fontFamily: "digital-7", fontSize: { xs: "9rem", sm: "10rem", md: "11rem", lg: "12rem", xl: "13rem" }, color: "red", display: "flex", alignItems: "center"}}>{minutes}</Typography>
                    <Typography className="red_shadow" variant="h2" sx={{ fontFamily: "digital-7", fontSize: { xs: "9rem", sm: "10rem", md: "11rem", lg: "12rem", xl: "13rem" }, color: "red", display: "flex", alignItems: "center"}}>:</Typography>
                    <Typography className="red_shadow" variant="h2" sx={{ fontFamily: "digital-7", fontSize: { xs: "9rem", sm: "10rem", md: "11rem", lg: "12rem", xl: "13rem" }, color: "red", display: "flex", alignItems: "center"}}>{(seconds <= 9 ? "0" : "") + seconds}</Typography>
                  </Box>
                  {
                    changeCourt
                    ?
                    <div style={{ marginRight: "auto", display: "flex" }}>
                      <Typography variant="h4" sx={{ fontFamily: "digital-7", my: "auto", mx: 1, color: "#FFFFFF", fontWeight: 900}}>POS</Typography>
                      <div className={`button-arrow`} style={{ margin: "auto 0px", borderColor: possession === "Light" ? "transparent transparent transparent #FF0000" : ""}}></div>
                    </div>
                    :
                    <div style={{ marginRight: "auto", display: "flex" }}>
                      <Typography variant="h4" sx={{ fontFamily: "digital-7", my: "auto", mx: 1, color: "#FFFFFF", fontWeight: 900}}>POS</Typography>
                      <div className={`button-arrow`} style={{ margin: "auto 0px", borderColor: possession === "Dark" ? "transparent transparent transparent #FF0000" : ""}}></div>
                    </div>
                  }
                </Grid>
                <Divider sx={{ width:'99.8%', borderColor: "#FFFFFF", mt: 3, borderWidth: 1}}></Divider>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} sx={{ mt: 4 }}>
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: 900}}>{changeCourt ? "DARK" : "LIGHT"}</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                      <Typography className="green_shadow" variant="h1" sx={{ backgroundColor: "#000000", fontFamily: "digital-7", color: "#2CE71E", px: 3.5, fontSize: { xs: "8.5rem", sm: "9.5rem", md: "10.5rem", lg: "11.5rem", xl: "12.5rem" }, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, display: "flex", alignItems: "center" }}>{changeCourt ? (darkScore <= 9 ? "0" : "") + darkScore : (lightScore <= 9 ? "0" : "") + lightScore}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} sx={{ mt: 4 }}>
                  <Box textAlign="center">
                  <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 900}}>SHOT CLOCK</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                    <Typography className="orange_shadow" variant="h1" sx={{backgroundColor: "#000000", fontFamily: "digital-7", color: "#FFA500", px: 3, fontSize: { xs: "8rem", sm: "9rem", md: "10rem", lg: "11rem", xl: "12rem" }, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, display: "flex", alignItems: "center"}}>{shotClockSeconds}</Typography>
                    </Box> 
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} sx={{ mt: 4 }}>
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: 900}}>{changeCourt ? "LIGHT" : "DARK"}</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                      <Typography className="green_shadow" variant="h1" sx={{backgroundColor: "#000000", fontFamily: "digital-7", color: "#2CE71E", fontSize: { xs: "8.5rem", sm: "9.5rem", md: "10.5rem", lg: "11.5rem", xl: "12.5rem" }, px: 3.5, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, display: "flex", alignItems: "center" }}>{changeCourt ? (lightScore <= 9 ? "0" : "") + lightScore : (darkScore <= 9 ? "0" : "") + darkScore}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={2.4} lg={2.4} md={6} sm={6} xs={6} sx={{ mt: 4, mb: .5}}>
                  <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 600}}>TOL</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                      <Typography className="red_shadow" variant="h1" sx={{backgroundColor: "#000000", fontFamily: "digital-7", color: "red", fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem", xl: "7.5rem" }, px: 2.5, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, display: "flex", alignItems: "center" }}>{changeCourt ? timeoutDark : timeoutLight}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={2.4} lg={2.4} md={6} sm={6} xs={6} sx={{ mt: 4 }}>
                <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 600}}>FOULS</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                    <Typography className="red_shadow" variant="h1" sx={{backgroundColor: "#000000", fontFamily: "digital-7", color: "red", fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem", xl: "7.5rem" }, px: 2.5, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, textAlign: "center", display: "flex", alignItems: "center" }}>{changeCourt ? (foulDark < 5 ? foulDark : "P")  : (foulLight < 5 ? foulLight : "P")}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={2.4} lg={2.4} md={12} sm={12} xs={12} sx={{ mt: 4 }}>
                <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 600}}>PERIOD</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                    <Typography paragraph={true} className="red_shadow" variant="h4" sx={{backgroundColor: "#000000", fontFamily: "digital-7", color: "#FFA500", fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem", xl: "7.5rem" }, px: 6, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, textAlign: "center", display: "flex", alignItems: "center" }}>{quarter === "5" ? "OT" : quarter}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={2.4} lg={2.4} md={6} sm={6} xs={6} sx={{ mt: 4 }}>
                <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 600}}>FOULS</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                      <Typography paragraph className="red_shadow" variant="h4" sx={{backgroundColor: "#000000", height: "inherit", fontFamily: "digital-7", color: "red", fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem", xl: "7.5rem" }, px: 2.5, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, textAlign: "center", display: "flex", alignItems: "center" }}>{changeCourt ? (foulLight < 5 ? foulLight : "P")  : (foulDark < 5 ? foulDark : "P")}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={2.4} lg={2.4} md={6} sm={6} xs={6} sx={{ mt: 4 }}>
                <Box textAlign="center">
                    <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 600}}>TOL</Typography>
                    <Box sx={{ mx: "auto", display: "flex", justifyContent: "center" }}>
                      <Typography className="red_shadow" variant="h4" sx={{backgroundColor: "#000000", height: "100%", fontFamily: "digital-7-mono", color: "red", fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem", xl: "7.5rem" }, px: 2.5, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2, display: "flex", alignItems: "center" }}>{changeCourt ? timeoutLight : timeoutDark}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </>
    );
}

export default Scoreboard;