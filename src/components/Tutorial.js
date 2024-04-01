import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, ImageListItem } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import CreateTeamSS from "../assets/createTeamSS.PNG";
import CreateTeamSS_input from "../assets/createTeamSS_input.PNG"
import CreateTeamSS_alert from "../assets/createTeamSS_alert.PNG"
import CreateTeamSS_confirm from "../assets/createTeamSS_confirm.PNG"

export default function Tutorial({ onPress = () => { } }) {
    return (
        <div>
            <Accordion>
                <AccordionSummary><h2>Creating/Deleting a Team</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>Steps to CREATE a new team or DELETE an old one...</Typography>
                    <Typography><h1>  </h1></Typography>
                    <Typography>1. Click on 'Teams' on the Nav Bar.</Typography>
                    <Typography>2. Click on the <AddIcon sx={{ backgroundColor: "yellow", color: "black" }} /> icon on the right side, which will open up an input field...</Typography>
                    <Typography>The <AddIcon sx={{ backgroundColor: "yellow", color: "black" }} /> button is called "Create a New Team/Delete a Team"</Typography>
                    <ImageListItem sx={{ height: 10 }}>
                        <img
                            style={{ height: 250, objectFit: "contain" }}
                            src={`${CreateTeamSS}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>3. This is the input field.</Typography>
                    <Typography>4. Enter the NAME for the TEAM you are creating. Entering "Tutorial" for this example.</Typography>
                    <Typography>OR, Enter the NAME for the TEAM you are deleting.</Typography>
                    <Typography>5. Press the CREATE button. Press DELETE button for deleting.</Typography>
                    <Typography><h1>  </h1></Typography>
                    <ImageListItem sx={{ height: 10 }}>
                        <img
                            style={{ height: 250, objectFit: "contain" }}
                            src={`${CreateTeamSS_input}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography><h1>  </h1></Typography>
                    <Typography>6. Receive confirmation through an Alert.</Typography>
                    <ImageListItem sx={{ height: 10 }}>
                        <img
                            style={{ height: 250, objectFit: "contain" }}
                            src={`${CreateTeamSS_alert}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>7. Verify your created Team, Tutorial for this example, by clicking on Teams in Nav Bar and locating the Team.</Typography>
                    <Typography><h1>  </h1></Typography>
                    <ImageListItem sx={{ height: 10 }}>
                        <img
                            style={{ height: 250, objectFit: "contain" }}
                            src={`${CreateTeamSS_confirm}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                </AccordionDetails>
            </Accordion>
            
            <Accordion>
                <AccordionSummary><h2>Viewing Teams</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Steps to view your teams...
                    </Typography>
                    <Typography>1. Click on 'Teams' on the Nav Bar.</Typography>
                    <Typography>2. Click on the <FormatListBulletedIcon sx={{ backgroundColor: "yellow", color: "black" }} /> icon on the right side</Typography>
                    <Typography>The <FormatListBulletedIcon sx={{ backgroundColor: "yellow", color: "black" }} /> button is called "Show My Teams"</Typography>
                    <ImageListItem sx={{ height: 10 }}>
                        <img
                            style={{ height: 250, objectFit: "contain" }}
                            src={`${CreateTeamSS}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>3. This will show the list of teams you are added to or have created.</Typography>
                    <ImageListItem sx={{ height: 10 }}>
                        <img
                            style={{ height: 250, objectFit: "contain" }}
                            src={`${CreateTeamSS_confirm}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary><h2>Adding a Team Member to a Team</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Steps to add a team member go here...
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary><h2>Reporting a User Violation</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Steps to report a user violation go here...
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
