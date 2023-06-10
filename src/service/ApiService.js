class ApiService {
  static instance;

  constructor() {
    this.axios = null;
  }

  static get shared() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ApiService();
    return this.instance;
  }
  install(app) {
    this.axios = app.config.globalProperties.$axios;
  }

  async getData(path) {
    const result = await this.get(path);
    return result || {};
  }

  async getFile(path, objExcelHeader = null, isNeedAuth = true) {
    const config = { isNeedAuth, responseType: "arraybuffer" };

    if (objExcelHeader) {
      config.params = { excelHeader: objExcelHeader };
    }

    const result = await this.get(path, config);
    return result || {};
  }

  async postFile(path, obj) {
    const config = { responseType: "arraybuffer" };

    const result = await this.post(path, obj, config);
    return result || {};
  }

  async postData(path, obj) {
    const result = await this.post(path, obj);
    return result || {};
  }

  async postFiles(files) {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    const config = {
      contentType: "multipart/form-data",
    };

    const result = await this.post("test", formData, config);

    return result || {};
  }

  async putData(path, obj) {
    const result = await this.put(path, obj);
    return result || {};
  }

  async deleteData(path, isNeedAuth = true) {
    const config = { isNeedAuth };

    const result = await this.delete(path, config);
    return result || {};
  }

  async get(url, config) {
    const result = await this.axios
      .get(url, config)
      .then((res) => {
        if (res.code && res.code !== 200) {
          this.getErrorAlert(res);
        }
        return res;
      })
      .catch((err) => {
        const ret = this.getErrorResponse(err.response);
        return ret;
      });

    return result;
  }

  async post(url, obj, config) {
    const result = await this.axios
      .post(url, obj, config)
      .then((res) => {
        if (res.code && res.code !== 200) {
          this.getErrorAlert(res);
        }
        return res;
      })
      .catch((err) => {
        const ret = this.getErrorResponse(err.response);
        return ret;
      });

    return result;
  }

  async put(url, obj, config) {
    const result = await this.axios
      .put(url, obj, config)
      .then((res) => {
        if (res.code && res.code !== 200) {
          this.getErrorAlert(res);
        }
        return res;
      })
      .catch((err) => {
        const ret = this.getErrorResponse(err.response);
        return ret;
      });
    return result;
  }

  async delete(url, config) {
    const result = await this.axios
      .delete(url, config)
      .then((res) => {
        if (res.code && res.code !== 200) {
          this.getErrorAlert(res);
        }
        return res;
      })
      .catch((err) => {
        const ret = this.getErrorResponse(err.response);
        return ret;
      });
    return result;
  }

  getErrorResponse = (errorResponse) => {
    const ret = {
      error: true,
      data: null,
      status: errorResponse ? errorResponse.status : "",
      text: errorResponse ? errorResponse : "",
    };
    return ret;
  };

  getErrorAlert = (response) => {
    console.error(response);
  };
}

export default ApiService;
