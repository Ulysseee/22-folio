import glslify from 'vite-plugin-glslify'
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [glslify()],
});
