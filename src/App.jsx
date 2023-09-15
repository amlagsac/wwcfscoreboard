import { Box, ButtonGroup, Button, Container, Divider, Grid, TextField, IconButton } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css';

const App = () => {

  const shortBuzzer = new Audio("/sounds/Basketball Indoors Buzzer Sound Sound Effects Sound Effect Sounds EFX Sfx FX Sports Basketball.mp3");
  const longBuzzer = new Audio("/sounds/Long Lasting Basketball Buzzer.mp3");

  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [shotClockSeconds, setShotClockSeconds] = useState(24);
  const [gameClockPause, setGameClockPause] = useState(false);
  const [lightScore, setLightScore] = useState(0);
  const [darkScore, setDarkScore] = useState(0);
  const [timeoutLight, setTimeoutLight] = useState(5);
  const [timeoutDark, setTimeoutDark] = useState(5);
  const [possession, setPossession] = useState("");

  useEffect(() => {
    localStorage.setItem('minutes', JSON.stringify(minutes));
    localStorage.setItem('seconds', JSON.stringify(seconds));
    localStorage.setItem('shotClockSeconds', JSON.stringify(shotClockSeconds));
    localStorage.setItem('lightScore', JSON.stringify(lightScore));
    localStorage.setItem('darkScore', JSON.stringify(darkScore));
    localStorage.setItem('possession', JSON.stringify(possession));
    localStorage.setItem('timeoutLight', JSON.stringify(timeoutLight));
    localStorage.setItem('timeoutDark', JSON.stringify(timeoutDark));
  },[minutes, seconds, shotClockSeconds, lightScore, darkScore, possession, timeoutLight, timeoutDark])

  const handleGameClockPauseToggle = () => {
    setGameClockPause(false);
  }

  const handleGameClockPlayToggle = () => {
    setGameClockPause(true);
  }

  const handleGameClockResetToggle = () => {
    handleGameClockPauseToggle();
    setMinutes(10);
    setSeconds(0);
    setShotClockSeconds(24);
  }

  const handleShotClockHalfReset = () => {
    setShotClockSeconds(14);
  }

  const handleShotClockFullReset = () => {
    setShotClockSeconds(24);
  }

  useEffect(() => {
    let timer;
    if(gameClockPause && (minutes > 0 || seconds > 0 || shotClockSeconds > 0)) {
       timer = setInterval(() => {
        if (shotClockSeconds !== 0) {
          if (seconds === 0) {
            if (minutes === 0) {
              setGameClockPause(false);
              clearInterval(timer);
              longBuzzer.play();
              return;
            }
            setMinutes(minutes - 1);
            setSeconds(59);
          }
          else {
            setSeconds(seconds - 1);
          }
          setShotClockSeconds(shotClockSeconds - 1);
        }
        else {
          setGameClockPause(false);
          clearInterval(timer);
          longBuzzer.play();
          return;
        }
      }, 1000)
    }
    else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameClockPause, minutes, seconds, shotClockSeconds, longBuzzer])

  const lightTimeoutDecrement = (e) => {
    setTimeoutLight((prev) => {
      if (prev !== 0) {
        longBuzzer.play()
        return prev -= 1
      }
      else
        return 0;
    });
  }
  const darkTimeoutDecrement = (e) => {
    setTimeoutDark((prev) => {
      if (prev !== 0) {
        longBuzzer.play()
        return prev -= 1;
      }
      else
        return 0;
    });
  }

  const plusOnePointLight = () => {
    setLightScore((prev) => {
      return prev + 1;
    })
  }

  const plusTwoPointLight = () => {
    setLightScore((prev) => {
      return prev + 2;
    })
  }
  const plusThreePointLight = () => {
    setLightScore((prev) => {
      return prev + 3;
    })
  }

  const minusOnePointLight = () => {
    setLightScore((prev) => {
      if ((prev - 1) === 0 || (prev - 1) < 0)
        return 0;
      else
        return prev - 1;
    })
  }

  const minusTwoPointLight = () => {
    setLightScore((prev) => {
      if ((prev - 2) === 0 || (prev - 2) < 0 )
        return 0;
      else
        return prev - 2;
    })
  }

  const minusThreePointLight = () => {
    setLightScore((prev) => {
      if ((prev - 3) === 0 || (prev - 3) < 0 )
        return 0
      else
        return prev - 3;
    })
  }

  const plusOnePointDark = () => {
    setDarkScore((prev) => {
      return prev + 1;
    })
  }

  const plusTwoPointDark = () => {
    setDarkScore((prev) => {
      return prev + 2;
    })
  }
  const plusThreePointDark = () => {
    setDarkScore((prev) => {
      return prev + 3;
    })
  }

  const minusOnePointDark = () => {
    setDarkScore((prev) => {
      if ((prev - 1) === 0 || (prev - 1) < 0)
        return 0;
      else
        return prev - 1;
    })
  }

  const minusTwoPointDark = () => {
    setDarkScore((prev) => {
      if ((prev - 2) === 0 || (prev - 2) < 0)
        return 0;
      else
        return prev - 2;
    })
  }

  const minusThreePointDark = () => {
    setDarkScore((prev) => {
      if ((prev - 3) === 0 || (prev - 3) < 0)
        return 0;
      else
        return prev - 3;
    })
  }
  
  const resetLightTimeout = (e) => {
    setTimeoutLight((prev) => {
      if (prev === 5) {
        return prev;
      }
      else 
        return 5;
    })
  }

  const resetDarkTimeout = (e) => {
    setTimeoutDark((prev) => {
      if (prev === 5) {
        return prev;
      }
      else 
        return 5;
    })
  }

  const handlePossessionChange = (event) => {
    setPossession(event.target.value);
  }

  return (
    <>
      <IconButton size="small"><Link to="/scoreboard" target="_blank">Open Scoreboard</Link></IconButton>
      <Grid container spacing={3}>
        <Grid item lg={12} style={{ textAlign: "center", fontSize: "1.9rem" }}><h1 >WWCF Basketball League Scoreboard 2023</h1></Grid>
        <Divider style={{ width:'100%', fontSize: "1.25rem"}}>Game Controls</Divider>
        <Grid item lg={4} md={6} xs={12}>
          <Box sx={{ width: 469.328, height: 300, display: "flex", border: "solid", borderRadius: 3, ml: 1.5}}>
            <Container fixed>
              <h2 style={{ fontSize: "1.75rem" }}>Game Clock Setting</h2>
              <TextField label='Minutes' value={minutes} type="number" sx={{ width: 75, marginRight: 1 }}></TextField>
              <TextField label='Seconds' value={seconds} type="number" sx={{ width: 75, marginRight: 1}}></TextField>
              <IconButton size="large" sx={{ marginTop: -.1, marginLeft: -1 }} onClick={handleGameClockPlayToggle}>
                <PlayCircleOutlineIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" sx={{ marginTop: -.1, marginLeft: -2.5 }} onClick={handleGameClockPauseToggle}>
                <PauseCircleOutlineIcon fontSize="inherit"></PauseCircleOutlineIcon>
              </IconButton>
              <IconButton size="large" sx={{ marginTop: -.1, marginLeft: -2.5 }} onClick={handleGameClockResetToggle}>
                <RestartAltIcon fontSize="inherit"></RestartAltIcon>
              </IconButton>
              <h2 style={{ fontSize: "1.75rem" }}>Shot Clock Setting</h2>
              <TextField label='Seconds' value={shotClockSeconds} type="number" sx={{ width: 75, marginRight: 1}}></TextField>
              <IconButton size="large" sx={{ marginTop: -.1, marginLeft: -1 }} onClick={handleShotClockHalfReset}>
                <HourglassBottomOutlinedIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" sx={{ marginTop: -.1, marginLeft: -2.5 }} onClick={handleShotClockFullReset}>
                <RestartAltIcon fontSize="inherit"></RestartAltIcon>
              </IconButton>
            </Container>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
        <Box sx={{ width: 469.328, height: 300, display: "flex", border: "solid", borderRadius: 3 }}>
            <Container fixed>
              <h2 style={{ fontSize: "1.75rem" }}>Game Score Setting</h2>
              <Divider style={{ width:'100%', marginBottom: "1rem"}}></Divider>
              <Container sx={{ display: "flex", justifyContent: "center"}} >
                <h3 style={{ fontSize: "1.25rem", marginRight: ".5rem" }}>Light</h3>
                <TextField fullWidth value={lightScore} type="number" inputProps={{ style: { textAlign: "center" }}} sx={{ marginRight: 1 }}></TextField>
                <TextField fullWidth value={darkScore} type="number" inputProps={{ style: { textAlign: "center" }}} sx={{ marginRight: 1}}></TextField>
                <h3 style={{ fontSize: "1.25rem", marginRight: ".5rem" }}>Dark</h3>
              </Container>
              <ButtonGroup color="success" variant="outlined" aria-label="outlined button group" sx={{ marginTop: 2}}>
                <Button onClick={plusOnePointLight}>+<LooksOneIcon/></Button>
                <Button onClick={plusTwoPointLight}>+<LooksTwoIcon/></Button>
                <Button onClick={plusThreePointLight}>+<Looks3Icon/></Button>
              </ButtonGroup>
              <ButtonGroup color="success" variant="contained" aria-label="outlined button group" sx={{ marginTop: 2, marginLeft: 4.23 }}>
                <Button onClick={plusOnePointDark}>+<LooksOneIcon/></Button>
                <Button onClick={plusTwoPointDark}>+<LooksTwoIcon/></Button>
                <Button onClick={plusThreePointDark}>+<Looks3Icon/></Button>
              </ButtonGroup>
              <ButtonGroup color="error" variant="outlined" aria-label="outlined button group" sx={{ marginTop: 2}}>
                <Button onClick={minusOnePointLight}>-<LooksOneIcon/></Button>
                <Button onClick={minusTwoPointLight}>-<LooksTwoIcon/></Button>
                <Button onClick={minusThreePointLight}>-<Looks3Icon/></Button>
              </ButtonGroup>
              <ButtonGroup color="error" variant="contained" aria-label="outlined button group" sx={{ marginTop: 2, marginLeft: 6.87 }}>
                <Button onClick={minusOnePointDark}>-<LooksOneIcon/></Button>
                <Button onClick={minusTwoPointDark}>-<LooksTwoIcon/></Button>
                <Button onClick={minusThreePointDark}>-<Looks3Icon/></Button>
              </ButtonGroup>
              <Box sx={{ textAlign: "center" }}>
                <Button size="small" variant="outlined" sx={{ marginTop: 1}}>Change Court</Button>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
        <Box sx={{ width: 469.328, height: 300, display: "flex", border: "solid", borderRadius: 3 }}>
            <Container fixed>
              <h2 style={{ fontSize: "1.75rem" }}>TimeOut and Ball Possession Setting</h2>
              <Divider style={{ width:'100%', marginBottom: "1rem"}}></Divider>
              <Container sx={{ display: "flex", justifyContent: "center"}} >
                <h3 style={{ fontSize: "1.25rem", marginRight: ".5rem" }}>Light</h3>
                <TextField disabled fullWidth value={timeoutLight} type="number" inputProps={{ style: { textAlign: "center" }}} sx={{ marginRight: 1 }}></TextField>
                <TextField disabled fullWidth value={timeoutDark} type="number" inputProps={{ style: { textAlign: "center" }}} sx={{ marginRight: 1}}></TextField>
                <h3 style={{ fontSize: "1.25rem", marginRight: ".5rem" }}>Dark</h3>
              </Container>
              <Button size="small" variant="outlined" onClick={lightTimeoutDecrement}>Timeout Light</Button>
              <IconButton size="large" sx={{ marginLeft: -.2 }} onClick={resetLightTimeout}>
                <RestartAltIcon fontSize="inherit"></RestartAltIcon>
              </IconButton>
              <IconButton size="large" sx={{ marginLeft: 8.75 }} onClick={resetDarkTimeout}>
                <RestartAltIcon fontSize="inherit"></RestartAltIcon>
              </IconButton>
              <Button size="small" variant="contained" sx={{ marginRight: 0 }} onClick={darkTimeoutDecrement} >Timeout Dark</Button>
              <Divider style={{ width:'100%', marginTop: ".5rem"}}></Divider>
              <Box sx={{ marginTop: 2, display: "flex" }}>
                <FormControl>
                  <FormLabel>Ball Possession</FormLabel>
                  <RadioGroup row onChange={handlePossessionChange}>
                    <FormControlLabel value="Light" control={<Radio />} label="Light" />
                    <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
                  </RadioGroup>
                </FormControl>
                <Divider orientation="vertical" style={{ height: 70, margin: 0, padding: 0 }}></Divider>
                <h3 style={{ marginLeft: 20, marginTop: 30}}>Buzzers</h3>
                <IconButton size="large" onClick={() => { longBuzzer.play() }}>
                  <CampaignOutlinedIcon sx={{ fontSize: "inherit" }}/>
                </IconButton>
                <IconButton size="large" onClick={() => { shortBuzzer.play() }}>
                  <NotificationsActiveOutlinedIcon sx={{ fontSize: "inherit" }}/>
                </IconButton>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;