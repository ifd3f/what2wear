import React, { ReactNode } from "react"
import { Grid, Paper } from "@material-ui/core"
import { useStyles } from "../material-styles"
import { GiArmoredPants, GiRunningShoe, GiTopHat, RiSurgicalMaskLine, RiTShirtLine } from "react-icons/all"


type ClothingType = {
  name: string
  icon: ReactNode
}

type ClothingReason = {
  text: string
  severity: string
}

type ClothingRowProps = {
  clothesType: ClothingType
  toWear: string
  reason: ClothingReason
}

function ClothingDisplay({clothesType, toWear, reason}: ClothingRowProps) {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper className={classes.paper}>
          <Grid>
            {clothesType.name}
          </Grid>
          <Grid>
            {clothesType.icon}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.paper}>Wear {toWear} today.</Paper>
      </Grid>
      <Grid item xs color={reason.severity}>
        <Paper className={classes.paper}>{reason.text}</Paper>
      </Grid>
    </Grid>
  )
}

export function WearGrid() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <ClothingDisplay clothesType={{name: 'Hat', icon: <GiTopHat/>}}
                     toWear={"a baseball cap"}
                     reason={{text: "Sunny, UV index", severity: "warning" }}/>
        <ClothingDisplay clothesType={{name: 'Mask', icon: <RiSurgicalMaskLine/>}}
                     toWear={"a N95 mask"}
                     reason={{text: "COVID-19 pandemic, AQI: 95", severity: "warning" }}/>
        <ClothingDisplay clothesType={{name: 'Top', icon: <RiTShirtLine/>}}
                     toWear={"a T-shirt"}
                     reason={{text: "100 degrees high", severity: "warning" }}/>
        <ClothingDisplay clothesType={{name: 'Bottom', icon: <GiArmoredPants/>}}
                     toWear={"a skirt"}
                     reason={{text: "100 degrees high", severity: "warning" }}/>
        <ClothingDisplay clothesType={{name: 'Shoes', icon: <GiRunningShoe/>}}
                     toWear={"boots"}
                     reason={{text: "Flooding", severity: "warning" }}/>
      </Grid>
    </div>
  )
}
