import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            theme: 'light',
            alerts: [
                /* {type: 'success', message: 'This is a success alert. This is a success alert. This is a success alert. This is a success alert'},
                {type: 'error', message: 'This is an error alert'},
                {type: 'warning', message: 'This is a warning alert'},
                {type: 'info', message: 'This is an info alert'}, */
            ],
            currentFolder: null,
            path: null,
            findFolderById: function(id){
                function findFolder(id, folder){
                    if(folder.id == id){
                        return folder;
                    }else if(folder.subfolders){
                        for(let subfolder of folder.subfolders){
                            let foundFolder = findFolder(id, subfolder);
                            if(foundFolder) return foundFolder;
                        }
                    }
                }
                return findFolder(id, this.path);
            },
            reorderFolders: function(folder){
                // reorder folders alphabetically
                folder.subfolders.sort((a, b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                });
            },
            pathToFolder: function(id){
                let path = route('app.folders.index')
                let pathArr = []
                let currentFolder = this.findFolderById(id)
                while(currentFolder){
                    pathArr.unshift(currentFolder.slug)
                    currentFolder = currentFolder.parent_id ? this.findFolderById(currentFolder.parent_id) : null
                }
                //remove root because it is not needed
                pathArr.shift()
                pathArr.forEach(slug => {
                    path += '/' + slug
                })
                return path
            }
        }

    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        },
        addAlert(state, alert){
            state.alerts.push(alert);
    
            setTimeout(() => {
                this.commit('removeAlert', alert);
            }, 10000);
        },
        removeAlert(state, alert){
            const index = state.alerts.indexOf(alert);
            if (index !== -1) {
                state.alerts.splice(index, 1);
            }
        },
        initFolderData(state, data){
            state.currentFolder = data.currentFolder
            state.path = data.path
        },
        addLoadedSubfolders(state, data){
            let parent = state.findFolderById(data.parentID)
            parent.subfolders = data.subfolders
            parent.showSubfolders = true
            parent.loading = false
        },
        updateCurrentFolder(state, folder){
            state.currentFolder = folder
        },
        addNewFolder(state, data){
            let parent = state.findFolderById(data.parentID)
            parent.subfolders.push(data.folder)
            state.reorderFolders(parent)
        },
        deleteFolder(state, data){
            let parent = state.findFolderById(data.parent_id);
            let index = parent.subfolders.findIndex(folder => folder.id === data.id);
            if (index !== -1) {
                parent.subfolders.splice(index, 1);
            }
        },
        removeSnippit(state, data){
            let index = state.currentFolder.snippits.findIndex(snippit => snippit.id == data.snippitId)
            if (index !== -1) {
                state.currentFolder.snippits.splice(index, 1);
            }
        },
        renameFolder(state, data){
            let folderInPath = state.findFolderById(data.folder.id);
            folderInPath.name = data.folder.name;
            folderInPath.slug = data.folder.slug
            if(state.currentFolder.id == data.folder.id){
                state.currentFolder.name = data.folder.name;
                state.currentFolder.slug = data.folder.slug;
            }
            let parent = state.findFolderById(data.folder.parent_id);
            state.reorderFolders(parent)
        }
    },
    getters: {
        theme(state) {
            return state.theme;
        },
        simplePath(state){
            function buildPath(folder, currentFolderId, path = []) {
                if (folder.id === currentFolderId) {
                    return [...path, folder];
                } else if (folder.subfolders) {
                    for (let subfolder of folder.subfolders) {
                        const subPath = buildPath(subfolder, currentFolderId, [...path, folder]);
                        if (subPath) return subPath;
                    }
                }
                return null
            }
            return buildPath(state.path, state.currentFolder.id);
        },
    }
});

export default store;