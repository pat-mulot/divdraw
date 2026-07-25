const shapeUtils = {
  roundTypesList: ["tl","tr","br","bl"],
  // common
    getLimitedValueToSet: (value) => {
      let dir = value > 0 ? 1 : -1;
        if (value > 100) value = 100 * dir;
        if (value < 0) value = 0;
        return value;
    },
    
    // round
    getRoundValues:(value, elementData, type, subType) => {
      let valuesToReturn = {
        tl : 0,
        tr: 0,
        br: 0,
        bl: 0,
      }
      if (subType) {
        if (subType === "quarter") {
          valuesToReturn[type] = value;
        } else if (subType === "full") {
          valuesToReturn = {
            tl : elementData.round_ratio.tl,
            tr: elementData.round_ratio.tr,
            br: elementData.round_ratio.br,
            bl: elementData.round_ratio.bl,
          }
          if (type === "tl") {
            if (elementData.round_ratio.bl + value > 100) {
              valuesToReturn.bl = 100 - value;
            }
            if (elementData.round_ratio.tr + value > 100) {
              valuesToReturn.tr = 100 - value;
            }
          }
          if (type === "tr") {
            if (elementData.round_ratio.tl + value > 100) {
              valuesToReturn.tl = 100 - value;
            }
            if (elementData.round_ratio.br + value > 100) {
              valuesToReturn.br = 100 - value;
            }
          }
          if (type === "br") {
            if (elementData.round_ratio.bl + value > 100) {
              valuesToReturn.bl = 100 - value;
            }
            if (elementData.round_ratio.tr + value > 100) {
              valuesToReturn.tr = 100 - value;
            }
          }
          if (type === "bl") {
            if (elementData.round_ratio.tl + value > 100) {
              valuesToReturn.tl = 100 - value;
            }
            if (elementData.round_ratio.br + value > 100) {
              valuesToReturn.br = 100 - value;
            }
          }
          valuesToReturn[type] = value;
        }
      } else {
        valuesToReturn = {
          tl : elementData.round_ratio.tl,
          tr: elementData.round_ratio.tr,
          br: elementData.round_ratio.br,
          bl: elementData.round_ratio.bl,
        }
        valuesToReturn[type] = value;
      }
      return valuesToReturn;
    },

    // angle
    getAngleValues:(value, elementData, type) => {
      let valuesToReturn = {
        top_left : elementData.angle_ratio.top_left,
        top_right: elementData.angle_ratio.top_right,
        bottom_left : elementData.angle_ratio.bottom_left,
        bottom_right: elementData.angle_ratio.bottom_right,
      }
      valuesToReturn = shapeUtils.getAngleValuesToSet(value, type, valuesToReturn);
      return valuesToReturn;
    },

    getAngleValuesToSet(value, type, elementValues) {
      if (value <= 0) value = 0;
      if (value >= 100) value = 100;
      if (type == "top_left") {
        if (value + elementValues.top_right > 100) {
          elementValues.top_right = 100 - value;
        }
      } else if (type == "top_right") {
        if (elementValues.top_left + value > 100) {
          elementValues.top_left = 100 - value;
        }
      } else if (type == "bottom_left") {
        if (elementValues.bottom_right + value > 100) {
          elementValues.bottom_right = 100 - value;
        }
      } else if (type == "bottom_right") {
        if (elementValues.bottom_left + value > 100) {
          elementValues.bottom_left = 100 - value;
        }
      }
      if (
        type === "bottom_right"
        || type === "top_right"
      ) {
        if (elementValues.bottom_right > elementValues.top_right) elementValues.bottom_right = 0;
        if (elementValues.top_right > elementValues.bottom_right) elementValues.top_right = 0;
      } else if (
        type === "bottom_left"
        || type === "top_left"
      ) {
        if (elementValues.bottom_left > elementValues.top_left) elementValues.bottom_left = 0;
        if (elementValues.top_left > elementValues.bottom_left) elementValues.top_left = 0;
      }
      elementValues[type] = value;
      return elementValues;
    },

    getAngleShapeToSet(element) {
      const sumTop = element.angle_ratio.top_left + element.angle_ratio.top_right;
      const sumBottom = element.angle_ratio.bottom_left + element.angle_ratio.bottom_right;
      if (sumTop > 0 || sumBottom > 0) {
        if (sumTop === 100 || sumBottom === 100) {
          return "triangle";
        } else {
          return "trapeze";
        }
      } else {
        return "square";
      }
    },
}
export default shapeUtils;