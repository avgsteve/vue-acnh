
import LANGUAGE from './languageSettingTypes';
import translationData_en from './../../../src/locales/en.json';
import translationData_zhCN from './../../../src/locales/zhCN.json';
import translationData_zhTW from './../../../src/locales/zhTW.json';

export default {
  [LANGUAGE.SET_DISPLAY_LANGUAGE]({ commit }, data) {
    // console.log('執行 action: SET_DISPLAY_LANGUAGE');
    commit(LANGUAGE.SET_DISPLAY_LANGUAGE, data);
  },
  [LANGUAGE.SET_TRANSLATION_DATA]({ commit }, data) {
    // console.warn('執行 action: LANGUAGE.SET_TRANSLATION_DATA，資料數', data.length);

    const resultById = {};
    const resultByName = {};
    let id;
    let name;

    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      id = d._id.$oid.toString().trim();
      name = d.nameEn;
      const item = {
        id: id,
        name: name,
        category: d.category,
        translation: {
          en: d.nameEn,
          zhTW: d.nameTw,
          zhCN: d.nameCn,
        }
      };

      resultById[id] = item;
      resultByName[name] = item;
      // result.push(item);
    }


    // console.log('迴圈結束後的 id 跟 name: ', id, name);
    // console.log('完成的資料: ', resultById, resultByName);
    // let id = '6077d31e43da3c306ca3ae77';

    // console.time("測試byId");
    // let item = resultById.get(id);
    // console.log('測試用id找', item);
    // console.timeEnd("測試byId"); // 0.17504882812

    // console.time("測試byName");
    // item = resultByName.get(name);
    // console.log('測試用name找', item);
    // console.timeEnd("測試byName"); // 0.146240234375

    // console.log("resultById", resultById);
    // console.log("resultByName", resultByName);


    commit(LANGUAGE.SET_TRANSLATION_DATA_BY_ID, resultById);
    commit(LANGUAGE.SET_TRANSLATION_DATA_BY_NAME, resultByName);

  },
  [LANGUAGE.SET_TRANSLATION_DATA_FOR_CREATURES]({ commit, state }, data) {
    const translationObj = {};
    const allCreatureNames = Object.keys(translationData_en.creatures);
    for (let i = 0; i < allCreatureNames.length; i++) {
      const creatureName = allCreatureNames[i];
      const creatureNameZhTW = translationData_zhTW.creatures[creatureName];
      const creatureNameZhCN = translationData_zhCN.creatures[creatureName];
      translationObj[creatureName] = [creatureName, creatureNameZhTW, creatureNameZhCN].join(',');

    }
    commit(LANGUAGE.SET_TRANSLATION_DATA_FOR_CREATURES, translationObj);
  },
  [LANGUAGE.SET_TRANSLATION_DATA_FOR_RECIPES]({ commit, state }, data) {
    const translationObj = {};
    const items = Object.keys(translationData_en.items.item);
    // console.log('items: ', items);
    for (let i = 0; i < items.length; i++) {
      const itemName = items[i];
      const itemNameZhTW = translationData_zhTW.items.item[itemName];
      const itemNameZhCN = translationData_zhCN.items.item[itemName];
      translationObj[itemName] = [itemName, itemNameZhTW, itemNameZhCN].join(',');

    }
    // console.log('完成的 SET_TRANSLATION_DATA_FOR_RECIPES:', translationObj);
    commit(LANGUAGE.SET_TRANSLATION_DATA_FOR_RECIPES, translationObj);
  }

};
