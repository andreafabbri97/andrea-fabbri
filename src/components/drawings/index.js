import { Pizzeria, Chauffeur, School, Excavation, Accounting, BuildingSupplies, Supermarket, Supplements } from './clients'
import { SecondBrain, LolCoach, QuestZip } from './personal'
import { Platform, Pryor, Restaurant, Sup, B2work } from './products'

// The diagram of each project, by id.
export const drawings = {
  platform: Platform, pryor: Pryor, restaurant: Restaurant, sup: Sup, b2work: B2work,
  pizzeria: Pizzeria, chauffeur: Chauffeur, school: School, excavation: Excavation,
  accounting: Accounting, 'building-supplies': BuildingSupplies, supermarket: Supermarket, supplements: Supplements,
  'second-brain': SecondBrain, 'lol-coach': LolCoach, questzip: QuestZip,
}
