import { Ability, RawRule } from "@casl/ability";

const storeData: RawRule[] = JSON.parse(localStorage.getItem("abilities"));
const abilities = storeData ?? [];
export default new Ability(abilities);
