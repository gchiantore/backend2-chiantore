class Manager {
    constructor(model) {
        this.model = model;
    }
    create = async (data) => {
        try {
            const one = await this.model.create(data)
            return one;
        } catch (error) {
            throw error;
        }
    }

    readByEmail = async (data) => {
        try {
            const one = await this.model.findOne( {email:data} ).lean();
            return one;
        } catch (error) {
            throw error;
        }
    }

    readById = async (data) => {
        try {
            const one = await this.model.findOne( {_id:data} ).lean();
            return one;
        } catch (error) {
            throw error;
        }
    }

    read= async () => {
        try {
            const all = await this.model.find().lean();
            return all;
        } catch (error) {
            throw error;
        }
    }

    readPaginate= async (pg,limit,sort,filter) => {
        try {
            filter = filter ? JSON.parse(filter) : {};
            const options = {
                page: pg,
                limit,
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
                lean: true
            };  
            return await this.model.paginate(filter,options);
        } catch (error) {
            throw error;
        }
    }

    update=async (id, data) => {
        try {
            const opt={new:true}
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            return one;
        } catch (error) {
            throw error;
        }
    }

    destroy=async (id) => {
        try {
            const one = await this.model.findOneAndDelete(id);
            return one;
        } catch (error) {
            throw error;
        }
    }
}

export default Manager