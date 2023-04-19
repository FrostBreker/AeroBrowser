# Changelogs
    ## Version
        - Fix:
        - Add:

## 0.1.1:
    - Fix:
        - Selectall text in searchbar when click but its already focused
        - Searchbar always focus on update webview
        - IPC
    - Add:
        - changelog.md
        - App icon
        - Change the IPC event to channels in constants file
        - Remove window.require and pass all IPC to preload.

## 0.1.2:
    - Fix:
        - Sound Playing icon in tabBar display when no sound is playing
        - Remove electron update for now
    - Add:
        - Bookmarks
        - Click on BookmarkItem to open the bookmark
        - Third Mouse Button to open bookmark in new tab
        - userPrefernces in appData
        - bookmarks in appData
        - Store class to store userPreferences and bookmarks and later history
        - Store last size of the window
        - SearchBar
        - Setup Sentry for Issues & Performance
        - Setup DSN in env file

## 0.1.3:
    - Fix:
        
    - Add:
        - Reopen last tabs on startup

## 0.2.0 (NewAero):    
    - Add:
        In PR #5
        - NewAero recode
        - New UI
        - New SearchBar based on Safari
        - New TabManager
        - Bookmark Menu at the left
        
        In PR #6 
        - Bookmark Menu Button at the right with arrow down
        - Add Default Themes
        - Add WebviewController Button Forward, Back, Reload
        - Add DownoadButton to show download modal
        - Add Tab Reducer and Actions
        - Deconstruct The TabManager file to TabBar.jsx, TopBar.jsx and RouterManager.jsx
        - Add Close button in TopBar

        In PR #7 
        - Add Icons.jsx
        - Add Transition to display the closse button in TabBar
