import {match} from '../modules/match.js'
import {DB} from './DB.js'

class HieroglyphDb extends DB {

}

let hieroglyphDb = new HieroglyphDb()
await hieroglyphDb.fetch()

window.hieroglyphDb = hieroglyphDb
export {hieroglyphDb}