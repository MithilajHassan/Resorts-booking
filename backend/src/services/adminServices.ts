import CustomError from "../errors/customError"
import categoryRepository from "../repositories/categoryRepository"
import facilityRepository from "../repositories/facilityRepository"
import resortRepository from "../repositories/resortRepository"
import nodemailer from 'nodemailer'
import userRepository from "../repositories/userRepository"


class AdminServices {
    // Category ---------------------------------------------------------------
    async addCategory(name: string) {
        const exist = await categoryRepository.findByName(name)
        if (exist) {
            throw new CustomError('It is already exist', 409)
        }
        return await categoryRepository.create(name)
    }

    async editCategory(id: unknown, name: string) {
        const exist = await categoryRepository.findByName(name)
        if (exist && id != exist._id) {
            throw new CustomError('It is already exist', 409)
        }
        return await categoryRepository.edit(id, name)
    }

    async listCategories() {
        return await categoryRepository.find()
    }

    async deleteCategory(id: unknown) {

        return await categoryRepository.delete(id)
    }

    // Facility --------------------------------------------

    async addFacility(name: string) {
        const exist = await facilityRepository.findByName(name)
        if (exist) {
            throw new CustomError('It is already exist', 409)
        }
        return await facilityRepository.create(name)
    }

    async listfacilities() {
        return await facilityRepository.find()
    }

    async editFacility(id: unknown, name: string) {
        const exist = await facilityRepository.findByName(name)
        if (exist && id != exist._id) {
            throw new CustomError('It is already exist', 409)
        }
        return await facilityRepository.edit(id, name)
    }

    async deleteFacility(id: unknown) {

        return await facilityRepository.delete(id)
    }

    //----------------------- Resorts ---------------------------------------//

    async listResorts() {
        return await resortRepository.findAll()
    }
    async acceptResort(resortId: string) {
        return await resortRepository.accept(resortId)
    }
    async rejectResort(resortId: string, reason: string) {
        const resort = await resortRepository.reject(resortId)
        if (resort) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                service: "Gmail",
                secure: true,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_EMAIL_PASSWORD
                },
            })
            transporter.sendMail({
                to: resort?.email,
                from: process.env.USER_EMAIL,
                subject: "Rejected your resort profile",
                text: reason
            })

            return resort
        }
    }

    async manageResortBlock(id: string, status: boolean) {
        return await resortRepository.manageResortBlock(id, status)
    }

//----------------------- Users ---------------------------------------//

    async manageUserBlock(id: string, status: boolean) {
        return await userRepository.manageUserBlock(id, status)
    }

    async listUsers() {
        return userRepository.findAllUsers()
    }
}

export default new AdminServices()