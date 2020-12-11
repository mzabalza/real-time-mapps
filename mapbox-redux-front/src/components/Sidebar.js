// EXTERNAL IMPORTS
import React from 'react'
import { connect } from 'react-redux'

// INTERNAL IMPORTS
import { toggleTrains } from '../store/index'
import geojsonCtaStations from '../data/CTA_Rail_Stations.json'

// MATERIAL UI IMPORTS
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  radioRoot: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  typography: {
    color: 'black',
    fontWeight: 300,
    letterSpacing: theme.spacing.unit * 1 / 4
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    color: 'black'
  },
  button: {
    boxShadow: 'none'
  }
})

class Sidebar extends React.Component {
  state = {
    trainDisplay: '',
    anchorEl: null,
    trainStationIdx: null
  }

  handleChange = event => {

  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuItemClick = (event, index, station) => {
    this.setState({ trainStationIdx: index, anchorEl: null })
    this.props.map.flyTo({ center: station.coordinates, zoom: 15 })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { width, classes } = this.props
    const { trainDisplay, anchorEl, trainStationIdx } = this.state
    let stationTracker = []
    const stations = geojsonCtaStations.features
      .map(station => {
        if (!stationTracker.includes(station.properties.name)) {
          stationTracker.push(station.properties.name)
          return {
            stationName: station.properties.name,
            coordinates: [
              station.geometry.coordinates[0],
              station.geometry.coordinates[1]
            ]
          }
        }
      })
      .filter(station => station)

    return (
      <Paper className={`${classes.root} ${width}`}>
        <Grid
          className={classes.container}
          container
          spacing={32}
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12} className={classes.radioRoot}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className="">
                <Typography className={classes.typography}>
                  CTA LINES
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={trainDisplay}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>All</Typography>
                  }
                />
                <FormControlLabel
                  value="redLine"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>
                      Red Line
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="blueLine"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>
                      Blue Line
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="greenLine"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>
                      Green Line
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="orangeLine"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>
                      Orange Line
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="brownLine"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>
                      Brown Line
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="pinkLine"
                  control={<Radio />}
                  label={
                    <Typography className={classes.typography}>
                      Pink Line
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>


        </Grid>
      </Paper>
    )
  }
}

const mapState = state => {
  return {
    map: state.map
  }
}

// const mapDispatch = dispatch => {
//   return {
//     toggleTrains: option => dispatch(toggleTrains(option))
//   }
// }

export default withStyles(styles)(connect(mapState)(Sidebar))
