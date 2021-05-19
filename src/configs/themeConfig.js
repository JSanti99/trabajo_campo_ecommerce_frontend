// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: "SCom",
    appLogoImage: require("@src/assets/images/logo/logo.svg").default,
  },
  layout: {
    isRTL: false,
    skin: "semi-dark", // light, dark, bordered, semi-dark
    routerTransition: "fadeIn", // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: "horizontal", // vertical, horizontal
    contentWidth: "full", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "static", // static , sticky , floating, hidden
      backgroundColor: "white", // BS color options [primary, success, etc]
    },
    footer: {
      type: "static", // static, sticky, hidden
    },
    customizer: true,
    scrollTop: true, // Enable scroll to top button
  },
};

export default themeConfig;
