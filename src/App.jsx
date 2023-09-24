import { Box, ButtonGroup, Button, Container, Divider, Grid, TextField, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
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
import DataGridLight from "./DataGridLight";
import DataGridDark from "./DataGridDark";

const App = () => {

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));

  const sizes = () => {
    if (desktop) return "large";
    if (tablet) return "medium";
    if (mobile) return "small";
  };

  const buttonSizes = () => {
    if (desktop) return "medium";
    if (tablet) return "medium";
    if (mobile) return "small";
  };


  const shortBuzzer = new Audio(process.env.PUBLIC_URL + "/sounds/SubBuzzer.mp3");
  const longBuzzer = new Audio(process.env.PUBLIC_URL + "/sounds/LongBuzzerSound.mp3");

  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [shotClockSeconds, setShotClockSeconds] = useState(24);
  const [gameClockPause, setGameClockPause] = useState(false);
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
    localStorage.setItem('minutes', JSON.stringify(minutes));
    localStorage.setItem('seconds', JSON.stringify(seconds));
    localStorage.setItem('shotClockSeconds', JSON.stringify(shotClockSeconds));
    localStorage.setItem('lightScore', JSON.stringify(lightScore));
    localStorage.setItem('darkScore', JSON.stringify(darkScore));
    localStorage.setItem('possession', JSON.stringify(possession));
    localStorage.setItem('timeoutLight', JSON.stringify(timeoutLight));
    localStorage.setItem('timeoutDark', JSON.stringify(timeoutDark));
    localStorage.setItem('foulLight', JSON.stringify(foulLight));
    localStorage.setItem('foulDark', JSON.stringify(foulDark));
    localStorage.setItem('quarter', JSON.stringify(quarter));
    localStorage.setItem('changeCourt', JSON.stringify(changeCourt));
  },[minutes, seconds, shotClockSeconds, lightScore, darkScore, possession, timeoutLight, timeoutDark, foulLight, foulDark, quarter, changeCourt])

  const handleChangeCourt = () => {
    setChangeCourt(prev => {
      if(prev !== false) {
        return false;
      }
      else {
        return true;
      }
    });
  }

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
    const shotClockBuzzer = new Audio(process.env.PUBLIC_URL + "/sounds/ShotClock.mp3");
    const longBuzzer = new Audio(process.env.PUBLIC_URL + "/sounds/LongBuzzerSound.mp3");
    if(gameClockPause && (minutes > 0 || seconds > 0 || shotClockSeconds > 0)) {
       timer = setInterval(() => {
        if (shotClockSeconds !== 0) {
          if(shotClockSeconds === 1) {
            shotClockBuzzer.play();
          }
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
          return;
        }
      }, 1000)
    }
    else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameClockPause, minutes, seconds, shotClockSeconds])

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

  const lightFoulIncrement = (e) => {
    setFoulLight((prev) => {
      return prev += 1;
      })
  }
  const darkFoulIncrement = (e) => {
    setFoulDark((prev) => {
      return prev += 1;
      })
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

  const resetLightFoul = (e) => {
    setFoulLight((prev) => {
      if (prev === 0) {
        return prev;
      }
      else 
        return 0;
    })
  }

  const resetDarkFoul = (e) => {
    setFoulDark((prev) => {
      if (prev === 0) {
        return prev;
      }
      else 
        return 0;
    })
  }

  const changeQuarter = (e) => {
    if(e.target.value >= 1 && e.target.value <= 5) {
      setQuarter(e.target.value)
    }
  }

  const handlePossessionChange = (event) => {
    setPossession(event.target.value);
  }

  const changeMinutes = (e) => {
    if(e.target.value >= 0 && e.target.value <= 10) {
      setMinutes(e.target.value)
    }
  }

  const changeSeconds = (e) => {
    if(e.target.value >= 0 && e.target.value <= 59) {
      setSeconds(e.target.value)
    }
  }

  const changeShotClock = (e) => {
    if(e.target.value >= 1 && e.target.value <= 24) {
      setShotClockSeconds(e.target.value)
    }
  }

  return (
    <>
    <Container maxWidth={false} disableGutters sx={{ p: 1, backgroundColor: "#f4f8fb" }}>
      <IconButton size="small"><Link to="/scoreboard" target="_blank">Open Scoreboard</Link></IconButton>
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid item lg={12} xl={12} style={{ textAlign: "center" }}><Typography variant="h2" sx={{ fontFamily: "digital-7", color: "#0F77BC", fontWeight: 900}}>WWCF Basketball League Scoreboard 2023</Typography></Grid>
        <Divider sx={{ width:'100%', fontSize: "1.50rem" }}>Game Controls</Divider>
        <Grid item lg={4} md={6} xs={12}>
          <Box sx={{ width: "99%", height: "100%", display: "flex", border: "solid", borderRadius: 2}}>
            <Container fixed sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900}}>GAME CLOCK SETTINGS</Typography>
              <Divider sx={{ width:'100%', mb: 1 }}></Divider>
              <TextField label='Minutes' value={minutes} type="number" sx={{ width: 75, marginRight: 1 }} onChange={changeMinutes}></TextField>
              <TextField label='Seconds' value={seconds} type="number" sx={{ width: 75, marginRight: 1}} onChange={changeSeconds}></TextField>
              <IconButton size="large" sx={{ my: "2%", p: .5 }} onClick={handleGameClockPlayToggle}>
                <PlayCircleOutlineIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" sx={{ p: .5 }} onClick={handleGameClockPauseToggle}>
                <PauseCircleOutlineIcon fontSize="inherit"></PauseCircleOutlineIcon>
              </IconButton>
              <IconButton size="large" sx={{ p: .5 }} onClick={handleGameClockResetToggle}>
                <RestartAltIcon fontSize="inherit"></RestartAltIcon>
              </IconButton>
              <Typography variant="h4" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, mt: 3 }}>SHOT CLOCK SETTINGS</Typography>
              <Divider sx={{ width:'100%', mb: 1 }}></Divider>
              <TextField label='Seconds' value={shotClockSeconds} type="number" sx={{ width: 75, marginRight: 1}} onChange={changeShotClock}></TextField>
              <IconButton size="large" sx={{ my: "2%", p: .5 }} onClick={handleShotClockHalfReset}>
                <HourglassBottomOutlinedIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" sx={{ my: "2%", p: .5 }} onClick={handleShotClockFullReset}>
                <RestartAltIcon fontSize="inherit"></RestartAltIcon>
              </IconButton>
            </Container>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
        <Box sx={{ width: "99%", height: "100%", display: "flex", border: "solid", borderRadius: 2 }}>
            <Container fixed>
              <Typography variant="h4" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, mt: 3 }}>GAME SCORE SETTINGS</Typography>
              <Divider sx={{ width:'100%', mb: 2 }}></Divider>
              <Container sx={{ display: "flex", alignItems: "center" }} disableGutters>
                <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, pr: .2 }}>{changeCourt ? "DARK" : "LIGHT"}</Typography>
                <TextField fullWidth disabled value={changeCourt ? darkScore : lightScore} type="number" inputProps={{ sx: { textAlign: "center", fontSize: "1.5rem" }}} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"}, mr: .5,}}></TextField>
                <TextField fullWidth disabled value={changeCourt ? lightScore : darkScore} type="number" inputProps={{ sx: { textAlign: "center", fontSize: "1.5rem" }}} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"}, ml: .5}}></TextField>
                <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, pl: .3 }}>{changeCourt ? "LIGHT" : "DARK"}</Typography>
              </Container>
              <Container disableGutters>
                {changeCourt ? 
                  <>
                  <Grid container>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                    <ButtonGroup size={buttonSizes()} color="success" variant="contained" aria-label="outlined button group" sx={{ marginTop: 2, mr: "auto" }}>
                      <Button onClick={plusOnePointDark}>+<LooksOneIcon/></Button>
                      <Button onClick={plusTwoPointDark}>+<LooksTwoIcon/></Button>
                      <Button onClick={plusThreePointDark}>+<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end"}}>
                    <ButtonGroup size={buttonSizes()} color="success" variant="outlined" aria-label="outlined button group" sx={{ marginTop: 2, ml: "auto"}}>
                      <Button onClick={plusOnePointLight}>+<LooksOneIcon/></Button>
                      <Button onClick={plusTwoPointLight}>+<LooksTwoIcon/></Button>
                      <Button onClick={plusThreePointLight}>+<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                    <ButtonGroup size={buttonSizes()} color="error" variant="contained" aria-label="outlined button group" sx={{ marginTop: .5, mr: "auto" }}>
                      <Button onClick={minusOnePointDark}>-<LooksOneIcon/></Button>
                      <Button onClick={minusTwoPointDark}>-<LooksTwoIcon/></Button>
                      <Button onClick={minusThreePointDark}>-<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end"}}>
                    <ButtonGroup size={buttonSizes()} color="error" variant="outlined" aria-label="outlined button group" sx={{ marginTop: .5, ml: "auto" }}>
                      <Button onClick={minusOnePointLight}>-<LooksOneIcon/></Button>
                      <Button onClick={minusTwoPointLight}>-<LooksTwoIcon/></Button>
                      <Button onClick={minusThreePointLight}>-<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                  </>
                   :
                <>
                <Grid container>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                    <ButtonGroup size={buttonSizes()} color="success" variant="outlined" aria-label="outlined button group" sx={{ marginTop: 2, mr: "auto"}}>
                      <Button onClick={plusOnePointLight}>+<LooksOneIcon/></Button>
                      <Button onClick={plusTwoPointLight}>+<LooksTwoIcon/></Button>
                      <Button onClick={plusThreePointLight}>+<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end"}}>
                    <ButtonGroup size={buttonSizes()} color="success" variant="contained" aria-label="outlined button group" sx={{ marginTop: 2, ml: "auto" }}>
                      <Button onClick={plusOnePointDark}>+<LooksOneIcon/></Button>
                      <Button onClick={plusTwoPointDark}>+<LooksTwoIcon/></Button>
                      <Button onClick={plusThreePointDark}>+<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                    <ButtonGroup size={buttonSizes()} color="error" variant="outlined" aria-label="outlined button group" sx={{ marginTop: .5, mr: "auto" }}>
                      <Button onClick={minusOnePointLight}>-<LooksOneIcon/></Button>
                      <Button onClick={minusTwoPointLight}>-<LooksTwoIcon/></Button>
                      <Button onClick={minusThreePointLight}>-<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end"}}>
                    <ButtonGroup size={buttonSizes()} color="error" variant="contained" aria-label="outlined button group" sx={{ marginTop: .5, ml: "auto" }}>
                      <Button onClick={minusOnePointDark}>-<LooksOneIcon/></Button>
                      <Button onClick={minusTwoPointDark}>-<LooksTwoIcon/></Button>
                      <Button onClick={minusThreePointDark}>-<Looks3Icon/></Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                </> }
              </Container>
              <Box sx={{ textAlign: "center" }}>
                <Button value={changeCourt} onClick={handleChangeCourt} size="small" variant="outlined" sx={{ marginTop: 1}}>Change Court</Button>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
        <Box sx={{ width: "99%", height: "100%", display: "flex", border: "solid", borderRadius: 2 }}>
            <Container fixed>
              <Typography variant="h4" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, mt: 3 }}>TIMEOUT/POSSESSION SETTING</Typography>
              <Divider style={{ width:'100%', marginBottom: "1rem"}}></Divider>
              <Container sx={{ display: "flex", alignItems: "center"}} disableGutters>
              <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, pr: .2 }}>{changeCourt ? "DARK" : "LIGHT"}</Typography>
                <TextField disabled fullWidth value={changeCourt ? timeoutDark : timeoutLight} type="number" inputProps={{ sx: { textAlign: "center", fontSize: "1.5rem" }}} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"}, mr: .5,}}></TextField>
                <TextField disabled fullWidth value={changeCourt ? timeoutLight : timeoutDark} type="number" inputProps={{ sx: { textAlign: "center", fontSize: "1.5rem" }}} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"}, ml: .5,}}></TextField>
                <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, pl: .3 }}>{changeCourt ? "LIGHT" : "DARK"}</Typography>
              </Container>
              <Container disableGutters>
              {
                changeCourt ? 
                <>
                <Grid container>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                  <Box>
                  <Button size="small" variant="contained" onClick={darkTimeoutDecrement} sx={{ marginTop: 2, mr: "auto", my: "auto" }}>Timeout Dark</Button>
                    <IconButton size={sizes()} onClick={resetDarkTimeout}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end", flexDirection: "row-reverse"}}>
                    <Button size="small" variant="outlined" onClick={lightTimeoutDecrement} sx={{ my: "auto"}}>Timeout Light</Button>
                    <IconButton size={sizes()} onClick={resetLightTimeout} sx={{ ml: "auto", my: "auto" }}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Grid>
                </Grid>
                </>
                :
                <>
                <Grid container>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                  <Box>
                  <Button size="small" variant="outlined" onClick={lightTimeoutDecrement} sx={{ marginTop: 2, mr: "auto", my: "auto" }}>Timeout Light</Button>
                    <IconButton size={sizes()} onClick={resetLightTimeout}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end", flexDirection: "row-reverse"}}>
                    <Button size="small" variant="contained" onClick={darkTimeoutDecrement} sx={{ my: "auto"}}>Timeout Dark</Button>
                    <IconButton size={sizes()} onClick={resetDarkTimeout} sx={{ ml: "auto", my: "auto" }}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Grid>
                </Grid>
                </>
              }
              </Container>
              <Divider sx={{ width:'100%' }}></Divider>
              <Box sx={{ marginTop: 1, display: "flex" }}>
                <FormControl sx={{ mt: 1 }}>
                  <FormLabel>Ball Possession</FormLabel>
                  {changeCourt 
                  ? 
                    <RadioGroup row onChange={handlePossessionChange}>
                      <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
                      <FormControlLabel value="Light" control={<Radio />} label="Light" />
                    </RadioGroup>
                  :                  
                  <RadioGroup row onChange={handlePossessionChange}>
                    <FormControlLabel value="Light" control={<Radio />} label="Light" />
                    <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
                  </RadioGroup>
                  }
                </FormControl>
                <Divider orientation="vertical" style={{ height: 'inherit' }}></Divider>
                  <Typography variant="h5" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, my: "auto", ml: 3 }}>Buzzers:</Typography>
                  <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, my: "auto", ml: 1 }}>TO:</Typography>
                  <IconButton size="large" onClick={() => { longBuzzer.play() }}>
                    <CampaignOutlinedIcon sx={{ fontSize: "inherit" }}/>
                  </IconButton>
                  <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, my: "auto" }}>Sub:</Typography>
                  <IconButton size="large" onClick={() => { shortBuzzer.play() }}>
                    <NotificationsActiveOutlinedIcon sx={{ fontSize: "inherit" }}/>
                  </IconButton>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "99%", height: "100%", display: "flex", border: "solid", borderRadius: 2 }}>
            <Container fixed>
            <Typography variant="h4" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, mt: 3 }}>TEAM FOUL AND QUARTER SETTING</Typography>
              <Divider style={{ width:'100%', marginBottom: "1rem"}}></Divider>
              <Container sx={{ display: "flex", alignItems: "center"}} disableGutters>
              <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, pr: .2 }}>{changeCourt ? "DARK" : "LIGHT"}</Typography>
                <TextField disabled fullWidth value={changeCourt ? foulDark : foulLight} type="number" inputProps={{ sx: { textAlign: "center", fontSize: "1.5rem" }}} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"}, mr: .5,}}></TextField>
                <TextField disabled fullWidth value={changeCourt ? foulLight : foulDark} type="number" inputProps={{ sx: { textAlign: "center", fontSize: "1.5rem" }}} sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"}, ml: .5,}}></TextField>
                <Typography variant="h6" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, pl: .3 }}>{changeCourt ? "LIGHT" : "DARK"}</Typography>
              </Container>
              <Container disableGutters>
              {
                changeCourt ? 
                <>
                <Grid container>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                  <Box>
                  <Button size="small" variant="contained" onClick={darkFoulIncrement} sx={{ marginTop: 2, mr: "auto", my: "auto" }}>Foul Dark</Button>
                    <IconButton size="large" onClick={resetDarkFoul}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end", flexDirection: "row-reverse"}}>
                    <Button size="small" variant="outlined" onClick={lightFoulIncrement} sx={{ my: "auto"}}>Foul Light</Button>
                    <IconButton size="large" onClick={resetLightFoul} sx={{ ml: "auto", my: "auto" }}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Grid>
                </Grid>
                </>
                :
                <>
                <Grid container>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "start"}}>
                  <Box>
                  <Button size="small" variant="outlined" onClick={lightFoulIncrement} sx={{ marginTop: 2, mr: "auto", my: "auto" }}>Foul Light</Button>
                    <IconButton size="large" onClick={resetLightFoul}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} sx={{ display: "flex", alignItems: "end", flexDirection: "row-reverse"}}>
                    <Button size="small" variant="contained" onClick={darkFoulIncrement} sx={{ my: "auto"}}>Foul Dark</Button>
                    <IconButton size="large" onClick={resetDarkFoul} sx={{ ml: "auto", my: "auto" }}>
                      <RestartAltIcon fontSize="inherit"></RestartAltIcon>
                    </IconButton>
                  </Grid>
                </Grid>
                </>
              }
              </Container>
              <Divider style={{ width:'100%'}}></Divider>
              <Box sx={{ marginTop: 2, display: "flex" }}>
                <Typography variant="h5" sx={{ fontFamily: "digital-7", color: "#000000", fontWeight: 900, my: "auto",  mr: 2}}>Game Quarter:</Typography>
                <TextField label='Quarter' onChange={changeQuarter} value={quarter} type="number" sx={{ width: 75, marginRight: 1 }}></TextField>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} xs={12} sx={{ display: "flex", alignItems: "center"}}>
          <Box sx={{ width: "99%", height: "100%", display: "flex", border: "solid", borderRadius: 2 }}>
              <DataGridLight />
          </Box>  
        </Grid>
        <Grid item lg={4} md={6} xs={12} sx={{ display: "flex", alignItems: "center"}}>
          <Box sx={{ width: "99%", height: "100%", display: "flex", border: "solid", borderRadius: 2 }}>
              <DataGridDark />
          </Box>  
        </Grid>
      </Grid>
      </Container>
    </>
  );
}

export default App;