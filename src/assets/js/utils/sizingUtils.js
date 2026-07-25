const sizingUtils = {
    getCurrentAxisFromDirAndAngle: (direction, caseAngle) => {
        let axis = "top";
        if (
            direction == "left"
            || direction == "right"
            || direction == "right_bottom"
            || direction == "left_top"
        ) {
            axis = "left"
        }
        if (
            caseAngle == 1
            || caseAngle == 2
            || caseAngle == 5
            || caseAngle == 6
        ) {
            if (axis == "left") {
                axis = "top"
            } else {
                axis = "left";
            }
        }
        return axis;
    },

    getAngleDatasFromDirAndAngle: (selectedDirsArr) => {
        // définition de données selon les directions possibles.
        let dirsAngleDatas = {
            top: {dir_name: "top", size_name: "height"},
            right: {dir_name: "left", size_name: "width"},
            bottom: {dir_name: "top", size_name: "height"},
            left: {dir_name: "left", size_name: "width"},
        }
        // récupération des données du premier angle selectionné
        let primaryDatas = dirsAngleDatas[selectedDirsArr[0]];
        let datasToReturn = {
            prim: primaryDatas,
            sec: {}
        };

        // sinon on a un second angle, on récup les calculs du second angle
        if (selectedDirsArr[1]) {
            datasToReturn.sec = dirsAngleDatas[selectedDirsArr[1]];
        }
        // sinon pas de second angle, il faut récupérer le calcul relatif selon l'autre axe.
        else {
            // ex. si on a top et height
            // et qu'on a pas de secondaryDir,
            // alors on récup l'inverse de ce qu'a le primary
            datasToReturn.sec = {
                dir_name: primaryDatas.dir_name == "top" ? "left" : "top",
                size_name: primaryDatas.size_name == "height" ? "width" : "height",
            };
        }
        return datasToReturn;
    },
    
    getSingleCalculatedSizeDatas : (
        size,
        angleRad,

    ) => {
        const baseAdj = Math.abs(size * (Math.tan(angleRad)));
        const baseSize = Math.sqrt((size * size) + (baseAdj * baseAdj));
        const fixSize = Math.abs(baseSize * (Math.tan(angleRad)));
        const fixAdj = Math.abs(fixSize * (Math.cos(angleRad)));
        const fixOpp = Math.abs(fixSize * (Math.sin(angleRad)));
        return {
            base : {
                size : Math.round(baseSize * 100) / 100,
            },
            fix : {
                size : Math.round(fixSize * 100) / 100,
                dir : Math.round(baseAdj * 100) / 200,
                dir_adj : Math.round(fixAdj * 100) / 200,
                dir_opp : Math.round(fixOpp * 100) / 200,
            },
        }
    },

    getCaseDatasFromDir: (currentCase, currentDir) => {
        let caseFix = 0;
        if (currentDir == "top" || currentDir == "top_right") {
            caseFix = 0;
        } else if (currentDir == "right" || currentDir == "right_bottom") {
            caseFix = 2;
        } else if (currentDir == "bottom" || currentDir == "bottom_left") {
            caseFix = 4;
        } else if (currentDir == "left" || currentDir == "left_top") {
            caseFix = 6;
        }
        if (currentCase + caseFix > 7) {
            caseFix -= 8;
        }
        currentCase += caseFix;

        let fixCaseHalf = 1;
        if (currentCase > 3) {
            currentCase -= 4;
            fixCaseHalf = -1;
        }
        return {
            val : currentCase,
            size_fix : fixCaseHalf,
        }
    },

    fixDirFromCase : [
        {
            prim : {
                fix_dir : -1,
                adj_dir: 1,
                fix_size : 1,
                size : -1,
            },
            sec : {
                fix_dir : 1,
                adj_dir: -1,
                fix_size : 1,
                size : 1,
            },
        },
        {
            prim : {
                fix_dir : -1,
                adj_dir: 1,
                fix_size : 1,
                size : 1,
            },
            sec : {
                fix_dir : 1,
                adj_dir: -1,
                fix_size : -1,
                size : 1,
            },
        },
        {
            prim : {
                fix_dir : 1,
                adj_dir: -1,
                fix_size : -1,
                size : 1,
            },
            sec : {
                fix_dir : 1,
                adj_dir: -1,
                fix_size : 1,
                size : 1,
            },
        },
        {
            prim : {
                fix_dir : 1,
                adj_dir: -1,
                fix_size : 1,
                size : 1,
            },
            sec : {
                fix_dir : 1,
                adj_dir: -1,
                fix_size : 1,
                size : -1,
            },
        },
    ],

    getDirNameFromCase : (caseEighth, dir) => {
        let index = 0;
        if (caseEighth == 1 || caseEighth == 2) index = 1;
        else if (caseEighth == 3 || caseEighth == 4) index = 2;
        else if (caseEighth == 5 || caseEighth == 6) index = 3;
        let dirFromCase = [
            { // case 0, 7
              top : "top",
              right : "right",
              bottom : "bottom",
              left : "left",
            },
            { // case 1, 2
              top : "right",
              right : "bottom",
              bottom : "left",
              left : "top",
            },
            { // case 3, 4
              top : "bottom",
              right : "left",
              bottom : "top",
              left : "right",
            },
            { // case 5, 6
              top : "left",
              right : "top",
              bottom : "right",
              left : "bottom",
            },
        ];
        return dirFromCase[index][dir];

    },

    getAxeNameFromDir: (dir) => {
        if ((dir == "top" || dir == "bottom")) {
          return "top";
        } else {
          return "left";
        }
    },

    getCalculatedSizeDatas: (
        sizeNames,
        quarterAngleRadians,
        axesDatas,
        axisArr,
        caseEighth,
        selectedDir,
        isSecondaryDir = false
    ) => {
        let primAxis = axisArr.axis_0;
        let secAxis = axisArr.axis_1;
        if (
            caseEighth == 1
            || caseEighth == 2
            || caseEighth == 5
            || caseEighth == 6
        ) {
            primAxis = axisArr.axis_0;
            secAxis = axisArr.axis_1;
        }
        const caseDatas = sizingUtils.getCaseDatasFromDir(caseEighth, selectedDir);
        const caseFixDatas = sizingUtils.fixDirFromCase[caseDatas.val];
        let primDatas = sizingUtils.getSingleCalculatedSizeDatas(
            axesDatas[primAxis].size,
            quarterAngleRadians
        );
        let secDatas = {base: {size: 0 }, fix: {dir: 0, dir_adj: 0, dir_opp: 0, size: 0}};
        let basePrimSize = primDatas.base.size * axesDatas[primAxis].direction * caseFixDatas.prim.size;
        let baseSecSize = 0;
        let fixPrimSize = 0;
        let fixSecSize = 0;
        let basePrimDir = axesDatas[primAxis].size * 0.5 * axesDatas[primAxis].direction;
        let baseSecDir = 0;
        let basePrimFixDir = (
            primDatas.fix.dir
            * axesDatas[primAxis].direction
            * caseFixDatas.prim.fix_dir
        );
        let baseSecFixDir = 0;
        let primDatasFixDirAdj = 0;
        let secDatasFixDirAdj = 0;
        if (isSecondaryDir) {
            secDatas = sizingUtils.getSingleCalculatedSizeDatas(
                axesDatas[secAxis]?.size,
                quarterAngleRadians
            );
            secDatasFixDirAdj = (
                secDatas.fix.dir_adj
                * axesDatas[secAxis].direction
                * caseFixDatas.sec.adj_dir
            ) + primDatas.fix.dir_opp * axesDatas[primAxis].direction;
            primDatasFixDirAdj = (
                primDatas.fix.dir_adj
                * axesDatas[primAxis].direction
                * caseFixDatas.prim.adj_dir
            ) + secDatas.fix.dir_opp * axesDatas[secAxis].direction;
            baseSecFixDir += 
            (
                secDatas.fix.dir
                * axesDatas[secAxis].direction
                * caseFixDatas.sec.fix_dir
            );
            baseSecDir = (axesDatas[secAxis].size * 0.5 * axesDatas[secAxis].direction)
            fixSecSize = secDatas.fix.size * axesDatas[secAxis].direction * caseFixDatas.sec.fix_size;
            fixPrimSize = primDatas.fix.size * axesDatas[primAxis].direction * caseFixDatas.prim.fix_size;
            baseSecSize = secDatas.base.size * axesDatas[secAxis].direction * caseFixDatas.sec.size;
        }
        const offsets = {}
        offsets[primAxis] = basePrimDir + baseSecFixDir + secDatasFixDirAdj;
        offsets[secAxis] = baseSecDir + basePrimFixDir + primDatasFixDirAdj;
        offsets[sizeNames.prim] = (basePrimSize + fixSecSize) * caseDatas.size_fix;
        offsets[sizeNames.sec] = (baseSecSize + fixPrimSize) * caseDatas.size_fix;
        return offsets;
    },

    /**
     * le handler correspond au point milieu de l'axe correspondant à la direction
     * ex. si la direction est top, alors handler est le point au centre du segment top de l'élément
     * la variable handler permet d'afficher le point rouge dans la vue pour visualiser la position et débugger,
     * la variable handlerPosOrigine permet les calculs qui suivent
     * let handler = document.querySelector(".handler"); // TODO : DEBUG
     */
    getHandlerPosDatas: (
        objValuesToSet,
        anglesDatas,
        elementDatasOrigine,
        primDir,
        angleRadians,
        isSizingAngleElement
    ) => {
        let handlerPos = {}, handlerPosOrigine = {};
        if (!isSizingAngleElement) {
            handlerPos[anglesDatas.primary.dir_name] = objValuesToSet[anglesDatas.primary.dir_name] + (objValuesToSet[anglesDatas.primary.size_name] / 2) * Math.sin(angleRadians);
            handlerPos[anglesDatas.secondary.dir_name] = objValuesToSet[anglesDatas.secondary.dir_name] + (objValuesToSet[anglesDatas.primary.size_name] / 2) * Math.cos(angleRadians);
            handlerPosOrigine[anglesDatas.primary.dir_name] = elementDatasOrigine[anglesDatas.primary.dir_name] + (elementDatasOrigine[anglesDatas.primary.size_name] / 2) * Math.sin(angleRadians);
            handlerPosOrigine[anglesDatas.secondary.dir_name] = elementDatasOrigine[anglesDatas.secondary.dir_name] + (elementDatasOrigine[anglesDatas.primary.size_name] / 2) * Math.cos(angleRadians);
        } else {
            // COMMON :
            let piRad = Math.PI / 180;
            let h = (objValuesToSet["height"] / 2), w = (objValuesToSet["width"] / 2);
            let rayon = Math.sqrt((h * h) + (w * w));
            // Y :
            let angleY = Math.atan((w / h)) / piRad;
            let angleX = 90 - angleY;
            let cornerAngleRadians = angleY * piRad;
            let newAngleRadians = anglesDatas.primary.angle_radians + cornerAngleRadians;
            // X :
            if (primDir == "right" || primDir == "left") {
                angleX = Math.atan((h / w)) / piRad;
                angleY = 90 - angleX;
                cornerAngleRadians = angleX * piRad;
                newAngleRadians = anglesDatas.primary.angle_radians - cornerAngleRadians;
            }
            /** 
             * Formule :
             * coordonnée Y = position du centre du cercle en Y + rayon * sin(angle en radiant)
             * -> cooY = posY + rayon * sin((angle * (PI / 180)))
             * -> y = top + rayon * sin((angle * (PI / 180)))
             * coordonnée X = position du centre du cercle en X + rayon * cos(angle en radiant)
             * -> cooX = posX + rayon * cos((angle * (PI / 180)))
             * -> cooX = posX + rayon * cos((angle * (PI / 180)))
             */
            handlerPos[anglesDatas.primary.dir_name] = objValuesToSet[anglesDatas.primary.dir_name] + rayon * Math.sin(newAngleRadians);
            handlerPos[anglesDatas.secondary.dir_name] = objValuesToSet[anglesDatas.secondary.dir_name] + rayon * Math.cos(newAngleRadians);
            let hOrigine = (elementDatasOrigine["height"] / 2), wOrigine = (elementDatasOrigine["width"] / 2);
            let rayonOrigine = Math.sqrt((hOrigine * hOrigine) + (wOrigine * wOrigine));
            handlerPosOrigine[anglesDatas.primary.dir_name] = elementDatasOrigine[anglesDatas.primary.dir_name] + rayonOrigine * Math.sin(newAngleRadians);
            handlerPosOrigine[anglesDatas.secondary.dir_name] = elementDatasOrigine[anglesDatas.secondary.dir_name] + rayonOrigine * Math.cos(newAngleRadians);
        }
        // DEBUG : -----------------------------
        let handlerElm = document.querySelector(".handler"); // TODO : DEBUG
        handlerElm.style[anglesDatas.primary.dir_name] = handlerPos[anglesDatas.primary.dir_name] + "px"; // TODO : 
        handlerElm.style[anglesDatas.secondary.dir_name] = handlerPos[anglesDatas.secondary.dir_name] + "px"; // TODO : DEBUG
        // -------------------------------------
        return {
            current: handlerPos,
            origine: handlerPosOrigine,
        }
    },
}
export default sizingUtils;