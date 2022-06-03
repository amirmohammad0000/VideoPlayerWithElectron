"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Start Section Const
    const Fs = require("fs");
    const ElectronRemote = require("electron").remote;
    const MainWindow = ElectronRemote.getCurrentWindow();
    // Start Section Const

    // Start Section Variables
    let SectionVideo = document.querySelector(".section_video");
    let Video = document.querySelector(".video_section_video");
    let SrcVideo = document.querySelector(".src_video_section_video");
    let TextPlayPaused = document.querySelector(".text_play_paused_section_bottom_footer");
    let TextTime = document.querySelector(".text_time_section_bottom_footer");
    let TimeLine = document.querySelector(".time_line_section_time_line_section_top_footer");
    let TimeLineInner = document.querySelector(".time_line_inner_section_time_line_section_top_footer");
    let IconPlay = document.querySelector(".icon_play_section_icons_section_top_footer");
    let IconPause = document.querySelector(".icon_pause_section_icons_section_top_footer");
    let IconStop = document.querySelector(".icon_stop_section_icons_section_top_footer");
    let IconFastBackward = document.querySelector(".icon_fast_backward_section_icons_section_top_footer");
    let IconBackward = document.querySelector(".icon_backward_section_icons_section_top_footer");
    let IconFastForward = document.querySelector(".icon_fast_forward_section_icons_section_top_footer");
    let IconForward = document.querySelector(".icon_forward_section_icons_section_top_footer");
    let IconStepForward = document.querySelector(".icon_step_forward_section_icons_section_top_footer");
    let IconSound = document.querySelector(".icon_sound_section_icons_section_top_footer");
    let SoundLine = document.querySelector(".section_sound_line");
    let SoundLineInner = document.querySelector(".section_inner_sound_line");
    let SectionItemMenuOpenFile = document.querySelector(".section_item_menu_open_file");
    let SectionItemMenuAboutApp = document.querySelector(".section_item_menu_about_app");
    let StateFastBackward = 0;
    let StateFastForward = 0;
    // End Section Variables

    // Start Section Loaded
    SoundLineInner.style.width = Video.volume * 100 + "%";
    if (SrcVideo.getAttribute("src")) {
        MainWindow.title = SrcVideo.getAttribute("src");
    } else {
        MainWindow.title = "Video Player";
    }
    // End Section Loaded

    // Start Section Events
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 37) {
            Video.currentTime -= 10;
        }

        if (e.keyCode === 38) {
            Video.volume += 0.05;
            SoundLineInner.style.width = Video.volume * 100 + "%";
        }

        if (e.keyCode === 39) {
            Video.currentTime += 10;
        }

        if (e.keyCode === 40) {
            Video.volume -= 0.05;
            SoundLineInner.style.width = Video.volume * 100 + "%";
        }

        if (e.keyCode === 32) {
            if (Video.paused) {
                Video.play();
                TextPlayPaused.innerHTML = "Playing";
            } else {
                Video.pause();
                TextPlayPaused.innerHTML = "Paused";
            }
        }
    });

    SectionVideo.addEventListener("click", () => {
        if (Video.paused) {
            Video.play();
            TextPlayPaused.innerHTML = "Playing";
        } else {
            Video.pause();
            TextPlayPaused.innerHTML = "Paused";
        }
    });

    SectionVideo.addEventListener("dblclick", () => {
        if (SectionVideo.style.height === "90%") {
            SectionVideo.style.position = "fixed";
            SectionVideo.style.top = "0px";
            SectionVideo.style.width = "100%";
            SectionVideo.style.height = "100%";
        } else {
            SectionVideo.style.position = "relative";
            SectionVideo.style.width = "100%";
            SectionVideo.style.height = "90%";
        }
    });

    Video.addEventListener("timeupdate", () => {
        let HoursCurrentTime = Math.floor(Video.currentTime / 3600 % 60);
        let MinutCurrentTime = Math.floor(Video.currentTime / 60 % 60);
        let SecondCurrentTime = Math.floor(Video.currentTime % 60);
        let DurationHours = Math.floor(Video.duration / 3600 % 60);
        let DurationMinut = Math.floor(Video.duration / 60 % 60);
        let DurationSecond = Math.floor(Video.duration % 60);

        HoursCurrentTime = HoursCurrentTime >= 10 ? HoursCurrentTime : "0" + HoursCurrentTime;
        MinutCurrentTime = MinutCurrentTime >= 10 ? MinutCurrentTime : "0" + MinutCurrentTime;
        SecondCurrentTime = SecondCurrentTime >= 10 ? SecondCurrentTime : "0" + SecondCurrentTime;
        DurationHours = DurationHours >= 10 ? DurationHours : "0" + DurationHours;
        DurationMinut = DurationMinut >= 10 ? DurationMinut : "0" + DurationMinut;
        DurationSecond = DurationSecond >= 10 ? DurationSecond : "0" + DurationSecond;

        TextTime.innerHTML = HoursCurrentTime + ":" + MinutCurrentTime + ":" + SecondCurrentTime + " / " + DurationHours + ":" + DurationMinut + ":" + DurationSecond;
        TimeLineInner.style.width = Video.currentTime / Video.duration * 100 + "%";
    });

    TimeLine.addEventListener("click", (e) => {
        ////////////////////////////////////////////////////////////////////////////////////////
    });

    TimeLineInner.addEventListener("drag", (e) => {
        ////////////////////////////////////////////////////////////////////////////////////////
    });

    TimeLineInner.addEventListener("dragstart", (e) => {
        let TagImg = document.createElement("img");
        e.dataTransfer.setDragImage(TagImg, 0, 0);

    });

    SoundLine.addEventListener("click", (e) => {
        ////////////////////////////////////////////////////////////////////////////////////////
    });

    SoundLineInner.addEventListener("drag", (e) => {
        ////////////////////////////////////////////////////////////////////////////////////////
    });

    SoundLineInner.addEventListener("dragstart", (e) => {
        let TagImg = document.createElement("img");
        e.dataTransfer.setDragImage(TagImg, 0, 0);
    });

    IconPlay.addEventListener("click", () => {
        Video.play();
        TextPlayPaused.innerHTML = "Playing";
    });

    IconPause.addEventListener("click", () => {
        Video.pause();
        TextPlayPaused.innerHTML = "Paused";
    });

    IconStop.addEventListener("click", () => {
        Video.pause();
        Video.currentTime = 0;
        TextPlayPaused.innerHTML = "Stoping";
    });

    IconFastBackward.addEventListener("click", () => {
        let LengthSrc = SrcVideo.getAttribute("src").split("\\").length - 1;
        let SrcNameFile = SrcVideo.getAttribute("src").split("\\")[LengthSrc];
        let Src = SrcVideo.getAttribute("src").split(SrcNameFile)[0];
        Fs.readdir(Src, "utf-8", (err, Files) => {
            SrcVideo.setAttribute("src", Src + Files[StateFastBackward++]);
            MainWindow.title = SrcVideo.getAttribute("src");
            Video.load();
            if (StateFastBackward === Files.length - 1) {
                StateFastBackward = 0;
            }
        });
        StateFastBackward++;
    });

    IconBackward.addEventListener("click", () => {
        Video.playbackRate -= 0.25;
        Video.play();
        TextPlayPaused.innerHTML = "Playing";
    });

    IconFastForward.addEventListener("click", () => {
        let LengthSrc = SrcVideo.getAttribute("src").split("\\").length - 1;
        let SrcNameFile = SrcVideo.getAttribute("src").split("\\")[LengthSrc];
        let Src = SrcVideo.getAttribute("src").split(SrcNameFile)[0];
        Fs.readdir(Src, "utf-8", (err, Files) => {
            SrcVideo.setAttribute("src", Src + Files[StateFastForward]);
            MainWindow.title = SrcVideo.getAttribute("src");
            Video.load();
            if (StateFastForward === Files.length - 1) {
                StateFastForward = 0;
            }
        });
        StateFastForward++;
    });

    IconForward.addEventListener("click", () => {
        Video.playbackRate += 0.25;
        Video.play();
        TextPlayPaused.innerHTML = "Playing";
    });

    IconStepForward.addEventListener("click", () => {
        Video.pause();
        TextPlayPaused.innerHTML = "Paused";
        Video.currentTime += 1;
    });

    IconSound.addEventListener("click", () => {
        if (Video.muted === true) {
            Video.muted = false;
            IconSound.setAttribute("class", "fas fa-volume-up icons icon_sound_section_icons_section_top_footer");
            IconSound.setAttribute("title", "Mute");
        } else {
            Video.muted = true;
            IconSound.setAttribute("class", "fas fa-volume-mute icons icon_sound_section_icons_section_top_footer");
            IconSound.setAttribute("title", "UnMute");
        }
    });

    SectionItemMenuOpenFile.addEventListener("click", () => {
        ElectronRemote.dialog.showOpenDialog(MainWindow, {
            properties: ["openFile"],
            title: "Open File",
        }).then((val) => {
            if (val.filePaths[0]) {
                SrcVideo.setAttribute("src", val.filePaths[0]);
                Video.load();
                MainWindow.title = SrcVideo.getAttribute("src");
            }
        });
    });

    SectionItemMenuAboutApp.addEventListener("click", () => {
        ElectronRemote.dialog.showMessageBox(MainWindow, {
            title: "About",
            message: `Another : Amir Mohammad
Address Github : https://github.com/amirmohammad0000
Version : 1.0.0
Electron : v13.1.6
Chrome : v91.0.4472.124
NodeJs : v14.16.0
V8 : v9.1.269.36-electron.0`,
            type: "info",
            buttons: ["Ok", "copy"],
        }).then((val) => {
            if (val.response === 1) {
                ElectronRemote.clipboard.writeText(`Another : Amir Mohammad
Address Github : https://github.com/amirmohammad0000
Version : 1.0.0
Electron : v13.1.6
Chrome : v91.0.4472.124
NodeJs : v14.16.0
V8 : v9.1.269.36-electron.0`, "clipboard");
            }
        });
    });
    // End Section Events
});