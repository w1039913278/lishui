import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

export default {
  install: (Vue, options = {}) => {
    Vue.use(Viewer);
    Viewer.setDefaults({
      defaultOptions: {
        zIndex: 9999
      },
      Options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: false,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
      }
    });
  }
};
