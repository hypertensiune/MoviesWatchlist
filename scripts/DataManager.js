class DataManager{
    /**
     * Save data to chrome local storage
     */
    static saveData(){
        DATA["saved"] = "internally";
        chrome.storage.local.set({mbe_data: DATA});
        console.log("DATA saved", DATA);
    }

    /**
     * Get data from chrome local storage
     */
    static async getData(){
        return new Promise((resolve) => {
            chrome.storage.local.get(["mbe_data"], resolve);
        }).then(res => {
            if(res["mbe_data"])
                return res["mbe_data"];
            else{
                return {
                    "all": {},
                    "all": {},
                    "lists": {
                        "Bookmarks": [],
                        "Favorites": []
                    }
                }
            }
        });
    }

    /**
     * Remove a title from a list
     */
    static removeTitleFromList(title, list){
        if(list != "Favorites"){
            DATA.all[title].refs--;
            UI.removeCardComponent(list, title);
            DATA.lists[list] = DATA.lists[list].filter(t => t !== title);
            if(DATA.all[title].refs <= 0){
                delete DATA.all[title];
            }
        }
        else{
            DataManager.favoriteHandler(title);
        }
    }

    /**
     * Add a title to a list
     */
    static addTitleToList(title, list){
        if(DATA.lists[list].indexOf(title) == -1){
            DATA.lists[list].push(title);
            DATA.all[title].refs++;

            return true;
        }
        return false;
    }

    /**
     * Change "favorite" status of a movie
     */
    static favoriteHandler(title){
        DATA.all[title]['favorite'] = !DATA.all[title]['favorite'];
        if(DATA.all[title]['favorite']){
            DATA.lists.Favorites.push(title);
            UI.addFavorite(title);        
        }
        else{
            UI.removeFavorite(title);
            DATA.lists.Favorites = DATA.lists.Favorites.filter(e => e !== title);
        }
    }

    /**
     * Change "watched" status of a movie
     * @param {Object} btn jQuery object representing the button on which the event was fired 
     */
    static watchedHandler(title, btn){
        DATA.all[title]['watched'] = !DATA.all[title]['watched'];
    
        if($(btn).hasClass("active"))
            UI.removeWatched(title);
        else
            UI.addWatched(title);
    }

    static deleteList(list){
        if(confirm(`Do you want to delete "${list}"`)){
            for(let movie of DATA.lists[list]){
                DATA.all[movie].refs--;
                if(DATA.all[movie].refs <= 0){
                    delete DATA.all[movie];
                }
            }
            delete DATA.lists[list];
        }
    }

    static renameList(list){
        let newlist = prompt("Enter new name", [list]);
        if(newlist){
            DATA.lists[newlist] = DATA.lists[list];
            delete DATA.lists[list];

            return newlist;
        }
    }

    static createList(){
        let name = prompt("Create new list. Enter new list name");
        if(name){
            DATA.lists[name] = [];
            DataManager.saveData();
            window.location.reload();
        }
    }
}