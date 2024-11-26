import '../../utils/UiPathRobot'

export const recommendRecipe = (url) => {
    return new Promise((resolve, reject) => {
        let args = { url };

        UiPathRobot.init(10);
        UiPathRobot.getProcesses().then(processes => {
            let process = processes.find(p => p.name.includes('RecipeRecommendationFeature'));
            if (process) {
                process.start(args).then(result => {
                    resolve(result.recipeJSONResult);
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject(new Error('Process not found'));
            }
        }).catch(err => {
            reject(err);
        });
    });
}
