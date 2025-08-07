export default class FetchError extends Error {
    data: string|null;

    constructor(public message:string, public statusCode: number,  data?:string){
        super(message)
        this.name = "FetchError"
        this.data = data ?? null
    }
}