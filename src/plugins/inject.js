/**
 * @desc 需要挂载(注入)到根实例的都放在这里
 */
import LoaderApiLibrary from '@plugins/axios/api.js';
import axios from 'axios';
import ApiConfig from '../service/api/index.js';
import { USER_API_CONFIG, USER_AXIOS_CONFIG } from '../config/index.js';
import { apiRequestStartHandler, apiRequestEndHandler, apiRequestInterceptErrorHandler, requestErrorCallback } from '../config/interceptor/api.js';
import DataDictFilter from '@plugins/data-dict-filter/index.js';
import vBus from '@plugins/v-bus.js';
import moduleConst from './constant.js';

export default {
  install: (Vue, options = {}) => {
    USER_API_CONFIG.request_error_callback = requestErrorCallback;
    const Loader = new LoaderApiLibrary(ApiConfig, USER_API_CONFIG, USER_AXIOS_CONFIG);
    window.apiRequestStartHandler = apiRequestStartHandler;
    window.apiRequestEndHandler = apiRequestEndHandler;
    window.apiRequestInterceptErrorHandler = apiRequestInterceptErrorHandler;

    Object.defineProperty(Vue.prototype, '$loaderApiLibrary', { value: Loader });
    Object.defineProperty(Vue.prototype, '$api', { value: Loader.api });
    Object.defineProperty(Vue.prototype, '$axios', { value: axios });
    Object.defineProperty(Vue.prototype, '$dict', { value: new DataDictFilter({ label: 'name', code: 'id' }) });
    Object.defineProperty(Vue.prototype, '$vBus', { value: vBus });
    Object.defineProperty(Vue.prototype, '$constant', { value: moduleConst });
  }
};
