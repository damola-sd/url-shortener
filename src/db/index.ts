import { IMonkManager, ICollection } from "monk";
import * as monk from 'monk';



const db: IMonkManager = monk.default(process.env.DB_URL ?? '')
const links: ICollection = db.get('links');

links.createIndex({ "slug": 1 }, { unique: true })

export default links;