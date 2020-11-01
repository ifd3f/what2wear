import React, { PropsWithChildren, useState } from "react"
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core"
import { MdChevronLeft, MdHome, MdMenu } from "react-icons/all"
import { useStyles } from "./material-styles"

export function Layout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = () => {
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="persistent" anchor="left" open={drawerOpen} classes={{}}>
        <div>
          <IconButton onClick={closeDrawer}>
            <MdChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <MdHome />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </Drawer>

      {children}
    </div>
  )
}
