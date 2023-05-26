import { configureStore } from "@reduxjs/toolkit";
import translateState from "./translate-state";



export default configureStore({ reducer: translateState });
