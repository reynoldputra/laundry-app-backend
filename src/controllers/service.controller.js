import serviceService from "../services/service.service.js";

class ServiceController {
  static async createService(req, res) {
    const data = req.body;
    const service = await serviceService.createService(data)
    res.json({ message: "Success create service", data: service });
  }

  static async getAllServices(req, res) {
    const services = await serviceService.getAllServices()
    res.json({ message: "Success get all services", data: services });
  }

  static async getService(req, res) {
    const {id} = req.params
    const data = await serviceService.getService(id)
    res.json({message: "Success get detail service", data : data})
  }

  static async update(req, res) {
    const {id} = req.params
    const data = req.body
    const service = await serviceService.updateService(id, data)
    res.json({message: "Success update", data : service})
  }

  static async delete(req, res) {
    const {id} = req.params
    const service = await serviceService.deleteService(id)
    res.json({message: "Success delete", data : service})
  }

  static async getAllLsp(req, res) {
    const lsp = await serviceService.getAllLsp()
    res.json({message: "Success get lsp", data : lsp})
  }

  static async getLsp(req, res) {
    const {id} = req.params
    const lsp = await serviceService.getLsp(id)
    res.json({message: "Success get detail lsp", data : lsp})
  }
}

export default ServiceController

