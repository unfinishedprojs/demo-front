declare module "@suid/material/styles" {
  interface Palette {
    box: Palette["primary"];
  }

  interface PaletteOptions {
    box?: PaletteOptions["primary"];
  }
}