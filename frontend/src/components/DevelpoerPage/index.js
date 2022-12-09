import React from "react";

import githubIcon from './icons/github-icon.png'
import linkedIcon from './icons/linkedin-icon.png'
import KevPic from './icons/KevD-Profile-Image.png'

import "./developerPage.css";


export function AboutDevPage() {
    return (
        <div className="about-devs-container">
            <div className="about-devs-wrapper">
                <div className="about-us-title-container">
                    <h2 className="about-us-title">About us</h2>
                    <div className="repo-title">Project Github Repo: </div>
                    <a href="https://github.com/ChzFlvrHrse/Klickr-Group" target="_blank">
                        <h4 className="repo-link">
                            https://github.com/ChzFlvrHrse/Klickr-Group
                        </h4>
                    </a>
                    <div className="team-title">The Team</div>
                </div>
                <div className="team-container">
                    <div className="member-container">
                        <div className="member-pic-name">
                            <img className="dev-profile-pic" src={KevPic}></img>
                            <div className="dev-name">Kevin Duong</div>
                        </div>
                        <div className="dev-info-contatiner">
                            <a className="links-container" href="https://github.com/Kevin-D47" target="_blank">
                                <img className="github-icon" src={githubIcon}></img>
                                <div className="linked-titles">Github</div>
                            </a>
                            <a className="links-container" href='https://www.linkedin.com/in/kevin-duong-513341216/' target="_blank">
                                <img className="linkedin-icon" src={linkedIcon}></img>
                                <div className="linked-titles">LinkedIn</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
