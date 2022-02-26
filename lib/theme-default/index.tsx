import SelectionWidget from "./SelectionWidget";

import { CommonWidgetPropsDefine, CommonWidgetDefine } from "../types";
import { defineComponent } from "vue";

import TextWidget from "./TextWidget";
import NumberWidget from "./NumberWidget";

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget,
  },
};
