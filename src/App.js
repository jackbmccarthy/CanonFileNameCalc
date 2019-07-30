import React from 'react';
import logo from './logo.svg';
import { Button, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Paper, Container, Typography, AppBar, TextField, ListSubheader } from '@material-ui/core';
import { fontSize } from '@material-ui/system';


class App extends React.Component {

  componentDidUpdate() {
    console.log("on update:", this.state)
  }
  componentDidMount() { this.setState({ height: window.innerHeight - document.getElementById("topbar").offsetHeight - 20 }) }

  componentWillMount() {

    window.addEventListener("resize", (resize) => {
      var barHeight = document.getElementById("topbar").offsetHeight
      this.setState({ width: window.innerWidth, height: window.innerHeight - barHeight - 20 })
    })
  }


  state = {
    width: window.innerWidth,
    customText: "",
    customTextOptions: { name: "Custom Text", value: "", example: "" },
    exampleText: [],
    pasteText: [],
    timeOptions: [
      { name: "Year(Full)", value: "%DATE[Y]", example: new Date().getFullYear().toString() },
      { name: "Year(Short)", value: "%DATE[y]", example: new Date().getFullYear().toString().substring(2, 4) },
      { name: "Month", value: "%DATE[m]", example: new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1 },
      { name: "Day", value: "%DATE[d]", example: new Date().getDate() < 10 ? "0" + new Date().getDate().toString() : new Date().getDate() },
      { name: "Hour", value: "%DATE[T]", example: new Date().getHours() < 10 ? "0" + new Date().getHours().toString() : new Date().getHours() },
      { name: "Minute", value: "%DATE[M]", example: new Date().getMinutes() < 10 ? "0" + new Date().getMinutes().toString() : new Date().getMinutes().toString() },
      { name: "Second", value: "%DATE[S]", example: new Date().getSeconds() < 10 ? "0" + new Date().getSeconds().toString() : new Date().getSeconds().toString() },
      { name: "System Name", value: "%SYSNAME", example: "iR-ADV C355" },
      { name: "Location", value: "%SYSLOCTN", example: "First Floor" },
      { name: "Job Number", value: "%RCPTNUM", example: "0001" },
      { name: "Department ID", value: "%PARTID", example: "1234" },
      { name: "Username", value: "%USRNAME", example: "Username" },
    ]
  };

  render() {
    return (
      <div  >
        <AppBar id="topbar" position="static" style={{ backgroundColor: "#5066CA", }}>
          <Typography style={{ width: "100%", fontSize: "4vw", color: "white" }}>Canon imageRunner Advance File Name Calculator</Typography>
        </AppBar>


        <List style={{ maxWidth: 400, width: this.state.width * 0.3, float: "left", overflowY: "scroll", maxHeight: this.state.height, overflowX: "clip" }}>
          <Paper key={this.state.customTextOptions.name}>
            <ListItem style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}  >
              <div>
                <Typography style={{ fontSize: "3vw" }} >{this.state.customTextOptions.name}</Typography>



                {
                  // <ListItemText primaryTypographyProps={{ fontSize: "4vw" }} primary= secondary=></ListItemText>
                }


                <TextField style={{ marginRight: 30 }} value={this.state.customText} onChange={(text) => {
                  this.setState({ customText: text.target.value })
                }}></TextField>
              </div>

              <Button style={{ backgroundColor: "#5066CA", }} onClick={() => {
                if (this.state.customText.length >= 1) {
                  var newExample = this.state.exampleText.concat(this.state.customText)
                  var newPaste = this.state.pasteText.concat("%<" + this.state.customText + ">")
                  console.log(newExample)
                  this.setState({ exampleText: newExample, pasteText: newPaste, customText: "" })
                }
              }}>
                <Typography style={{ color: "white", fontSize: "2vw" }}>Add</Typography></Button>
            </ListItem></Paper>
          {this.state.timeOptions.map((row) => {
            return (
              <Paper key={row.name} style={{ margin: 3, }}>
                <ListItem style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", }}  >
                  <Typography>
                    <Typography style={{ fontSize: "3vw" }} >{row.name} </Typography>
                    <Typography style={{ flexWrap: "wrap", fontSize: "2vw" }}>{"Example:" + row.example}</Typography>
                  </Typography>


                  {
                    //<ListItemText primaryTypographyProps={{ fontSize: "5vw" }} primary= secondary={"Example:" + row.example}></ListItemText>
                  }
                  {
                    // <ListItemSecondaryAction>
                  }

                  <Button style={{ backgroundColor: "#5066CA", }} onClick={() => {
                    var newExample = this.state.exampleText.concat(row.example)
                    var newPaste = this.state.pasteText.concat(row.value)
                    console.log(newExample)
                    this.setState({ exampleText: newExample, pasteText: newPaste })
                  }}><Typography style={{ color: "white", fontSize: "2vw" }}>Add</Typography></Button>

                  {
                    //</ListItemSecondaryAction>
                  }
                </ListItem></Paper>
            )
          })}
        </List>
        <div style={{ width: "65%", height: this.state.height, float: "left", alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ height: "30%", width: "90%", margin: 5, alignItems: "center", justifyContent: "center" }}>
            <Typography style={{ width: "100%", fontSize: "4vw" }} >Sample File Name:</Typography>
            <Paper style={{ height: "70%", width: "90%", overflow: "auto", }} >
              <Typography style={{ height: "100%", fontSize: "4vw", flexWrap: "wrap", wordBreak: "break-all" }} align="center">
                {this.state.exampleText.map((item) => {
                  return item
                })}
                {this.state.exampleText.length > 0 ? ".pdf" : null}
              </Typography>
            </Paper>
          </div>
          <div style={{ height: "30%", width: "90%", margin: 5 }}>
            <Typography style={{ width: "100%", fontSize: "4vw" }}  >Paste into File Name:</Typography>
            <Paper style={{ height: "70%", width: "90%", justifyContent: "center", flexWrap: "wrap", overflow: "auto", }} >
              <Typography style={{ fontSize: "4vw", maxWidth: "100%", flexWrap: "wrap", wordBreak: "break-all", }} align="center">
                {this.state.pasteText.map((item) => {
                  return item
                })}
              </Typography>
            </Paper>
          </div>
          <div>
            <Button style={{ backgroundColor: "#5066CA", color: "white", margin: 10, marginTop: 30 }} onClick={() => {
              this.setState({ exampleText: [], pasteText: [] })
            }}>Clear</Button>
            <Button style={{ backgroundColor: "#5066CA", color: "white", margin: 10, marginTop: 30 }} color="white" onClick={() => {
              var oldExample = this.state.exampleText
              oldExample.pop()
              var oldPaste = this.state.pasteText
              oldPaste.pop()
              this.setState({ exampleText: oldExample, pasteText: oldPaste })
            }}>Back</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
