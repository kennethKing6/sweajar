import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, ImageListItem } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CreateTeamSS from "../assets/createTeamSS.PNG";
import CreateTeamSS_input from "../assets/createTeamSS_input.PNG"
import CreateTeamSS_alert from "../assets/createTeamSS_alert.PNG"
import CreateTeamSS_confirm from "../assets/createTeamSS_confirm.PNG"
import AddTeamMember from "../assets/addTeamMember.png"
import AddTeamMember_details from "../assets/addTeamMember_details.png"
import AddTeamMember_input from "../assets/addTeamMember_input.png"
import AddTeamMember_confirm from "../assets/addTeamMember_conf.png"
import Report_category from "../assets/report_category.png"
import Report_violations from "../assets/report_violations.png"
import Report_list from "../assets/report_list.png"
import { ExpandMoreRounded } from "@mui/icons-material";
import { Colors } from "../assets/colors"

export default function Tutorial({ onPress = () => { } }) {
    const listItemStyle = { height: 10, marginBottom: '20px', border: '1px solid yellow' }; // Adjust the margin as needed
    const imageSize = { maxWidth: 'auto', maxHeight: '70%' }; // Adjust the size as needed

    return (
        <div sx={{ fontSize: '12px', backgroundColor: "red" }}>
            <Accordion sx={{ color: Colors.TEXT_COLOR, backgroundColor: Colors.BACKGROUND_COLOR_EERIE, margin: "4px" }}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                ><h2>Creating/Deleting a Team</h2></AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: Colors.BACKGROUND_COLOR }}>
                    <Typography>Steps to CREATE a new team or DELETE an old one...</Typography>
                    <Typography>1. Click on 'Teams' on the Nav Bar.</Typography>
                    <Typography>2. Click on the <AddIcon sx={{ backgroundColor: "yellow", color: "black" }} /> icon on the right side, which will open up an input field...</Typography>
                    <Typography>The <AddIcon sx={{ backgroundColor: "yellow", color: "black" }} /> button is called "Create a New Team/Delete a Team"</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
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
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${CreateTeamSS_input}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>6. Receive confirmation through an Alert.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${CreateTeamSS_alert}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>7. Verify your created Team, Tutorial for this example, by clicking on Teams in Nav Bar and locating the Team.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
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

            <Accordion sx={{ color: Colors.TEXT_COLOR, backgroundColor: Colors.BACKGROUND_COLOR_EERIE, margin: "4px" }}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                ><h2>Viewing Teams</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Steps to view your teams...
                    </Typography>
                    <Typography>1. Click on 'Teams' on the Nav Bar.</Typography>
                    <Typography>2. Click on the <FormatListBulletedIcon sx={{ backgroundColor: "yellow", color: "black" }} /> icon on the right side</Typography>
                    <Typography>The <FormatListBulletedIcon sx={{ backgroundColor: "yellow", color: "black" }} /> button is called "Show My Teams"</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${CreateTeamSS}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Create Team representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>3. This will show the list of teams you are added to or have created.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
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

            <Accordion sx={{ color: Colors.TEXT_COLOR, backgroundColor: Colors.BACKGROUND_COLOR_EERIE, margin: "4px" }}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                ><h2>Adding a Team Member to a Team</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Steps to add a team member to a team...
                    </Typography>
                    <Typography>1. Click on 'Teams' on the Nav Bar.</Typography>
                    <Typography>2. Select a team and click on 'Details' button.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${AddTeamMember}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>3. On the 'Team Details' page, click on the <GroupAddIcon sx={{ backgroundColor: Colors.NAVBAR_SELECT_COLOR, color: Colors.TEXT_COLOR }}/> 'Add/Delete Team Member' button on the right side.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${AddTeamMember_details}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>4. Enter an email of an existing user and click on 'Add' button.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${AddTeamMember_input}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>5. The user is now part of your team.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${AddTeamMember_confirm}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ color: Colors.TEXT_COLOR, backgroundColor: Colors.BACKGROUND_COLOR_EERIE, margin: "4px" }}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                ><h2>Reporting a User Violation</h2></AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Steps to report a user violation...
                    </Typography>
                    <Typography>1. Make sure you are part of a team. Click on 'New Report' on the Nav Bar.</Typography>
                    <Typography>2. Select a violation category.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${Report_category}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>3. Select one or several violations from a category. Click on the 'Next' button at the bottom of the page.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${Report_violations}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>4. Select one or several employees that you want to report. Click on the 'Report' button.</Typography>
                    <ImageListItem sx={{ ...listItemStyle, ...imageSize }}>
                        <img
                            style={{ ...imageSize, objectFit: "contain" }}
                            src={`${Report_list}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                            alt="Add Team Member representation"
                            className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
                        />
                    </ImageListItem>
                    <Typography>5. You successfully reported a violation.</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
