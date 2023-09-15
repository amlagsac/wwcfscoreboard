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
    const [possession, setPossession] = useState("");

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
            setMinutes(minutes);
            setSeconds(seconds);
            setShotClockSeconds(shotClockSeconds);
            setLightScore(lightScore);
            setDarkScore(darkScore);
            setPossession(possession);
            setTimeoutLight(timeoutLight);
            setTimeoutDark(timeoutDark);
        }, 100) 
        return () => clearInterval(timer);
    }, [minutes, seconds, shotClockSeconds, lightScore, darkScore, possession])

    return(
        <>
    {/* <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <Typography variant="h4">Home Team</Typography>
              <Typography variant="h2">{lightScore}</Typography>
              <Button variant="contained" onClick={() => setLightScore(lightScore + 1)}>+1</Button>
              <Button variant="contained" onClick={() => setLightScore(lightScore - 1)}>-1</Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <Typography variant="h4">Away Team</Typography>
              <Typography variant="h2">{darkScore}</Typography>
              <Button variant="contained" onClick={() => setDarkScore(darkScore + 1)}>+1</Button>
              <Button variant="contained" onClick={() => setDarkScore(darkScore - 1)}>-1</Button>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h6">Game Clock</Typography>
              <Typography variant="h4">{minutes}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h6">Shot Clock</Typography>
              <Typography variant="h4">{shotClockSeconds}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container> */}
          <Container disableGutters maxWidth="false" sx={{ p: 0 }}>
            <Paper elevation={6} sx={{ height: '100vh', backgroundColor: '#242525'}}>
              <Grid container>
                <Grid item xl={12} lg={12} display={"flex"}>
                    <div style={{ marginLeft: "auto", display: "flex" }}>
                      <div className="button-arrow left" style={{ margin: "auto 0px", borderColor: possession === "Light" ? "transparent transparent transparent #FF0000" : ""}}></div>
                      <Typography variant="h4" sx={{ fontFamily: "digital-7", my: "auto", mx: 1, color: "#FFFFFF", fontWeight: 900}}>POS</Typography>
                    </div>
                  <Box sx={{ width: '40vw', mx: "auto", border: 1, borderColor: "white", borderWidth: 5, borderTop: "none", borderRadius: 2}} justifyContent="center" alignContent="center" display={"flex"} bgcolor={'#000000'}>
                    <Typography variant="h2" sx={{ fontFamily: "digital-7", fontSize: 200, color: "red"}}>{minutes}</Typography>
                    <Typography variant="h2" sx={{ fontFamily: "digital-7", fontSize: 200, color: "red"}}>:</Typography>
                    <Typography variant="h2" sx={{ fontFamily: "digital-7", fontSize: 200, color: "red"}}>{(seconds <= 9 ? "0" : "") + seconds}</Typography>
                  </Box>
                    <div style={{ marginRight: "auto", display: "flex" }}>
                      <Typography variant="h4" sx={{ fontFamily: "digital-7", my: "auto", mx: 1, color: "#FFFFFF", fontWeight: 900}}>POS</Typography>
                      <div className={`button-arrow`} style={{ margin: "auto 0px", borderColor: possession === "Dark" ? "transparent transparent transparent #FF0000" : ""}}></div>
                    </div>
                </Grid>
                <Divider sx={{ width:'100%', borderColor: "#FFFFFF", mt: 3, borderWidth: 1}}></Divider>
                <Grid item xl={4} lg={4} sx={{ mt: 1 }}>
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: 900}}>LIGHT</Typography>
                    <Box sx={{ width: '22.5vh', mx: "auto", border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                      <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "#2CE71E", fontSize: "175px" }}>{(lightScore <= 9 ? "0" : "") + lightScore}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} sx={{ mt: 1 }}>
                  <Box textAlign="center">
                  <Typography variant="h4" sx={{ color: "#FFFFFF", fontWeight: 900}}>SHOT CLOCK</Typography>
                    <Box sx={{ width: '22.5vh', mx: "auto", border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                    <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "#FFA500", fontSize: "120px"}}>{shotClockSeconds}</Typography>
                    </Box> 
                    <Typography variant="h4" sx={{ color: "#FFFFFF", fontWeight: 900, mt: 1}}>TEAM FOULS</Typography>
                  <Box sx={{ display: "flex"}}>
                    <Box sx={{ width: '20vh', height: '14vh', ml: '20%', mr: 2, border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                    <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "red", fontSize: "120px"}}>0</Typography>
                    </Box>
                    <Box sx={{ width: '20vh', height: '14vh', mr: '20%', border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                    <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "red", fontSize: "120px"}}>0</Typography>
                    </Box> 
                                        
                  </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} sx={{ mt: 1 }}>
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: 900}}>DARK</Typography>
                    <Box sx={{ width: '22.5vh', mx: "auto", border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                      <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "#2CE71E", fontSize: "175px"}}>{(darkScore <= 9 ? "0" : "") + darkScore}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} sx={{ mt: 3 }}>
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: 500}}>TOL</Typography>
                    <Box sx={{ width: '15vh', height: '14vh', mx: "auto", border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                      <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "red", fontSize: "120px" }}>{timeoutLight}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} sx={{ mt: 3 }}>
                  <Box textAlign="center">
                  <Box sx={{ display: "flex", mt: 5, mx: 'auto', justifyContent: "center" }}>
                    <Typography variant="h4" sx={{ color: "#FFFFFF", fontWeight: 900, my: "auto", mr: 1 }}>PERIOD</Typography>
                      <Box sx={{ width: '10vh', height: '15vh', border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                      <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "#FFA500", fontSize: "120px"}}>1</Typography>
                      </Box> 
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={4} lg={4} sx={{ mt: 3 }}>
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: 500}}>TOL</Typography>
                    <Box sx={{ width: '15vh', height: '14vh', mx: "auto", border: 1, borderColor: "white", borderWidth: 1, borderRadius: 2 }}>
                      <Typography variant="h1" sx={{ fontFamily: "digital-7", color: "red", fontSize: "120px"}}>{timeoutDark}</Typography>
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