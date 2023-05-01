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

## 0.1.3 (Abandoned):
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
        In PR #8
        - Add Transition to display the closse button in TabBar
        In PR #9
        - TabBar Close Button spin when hovering
        - Searchbar refresh button spin when hovering 
        - Add BookmarkMenu Component
        - Add AddBookmarkButton in Buttons
        - Activate Back and Forward Buttons
        - SearBar
            - Add getIcon function for button
            - Add get url of page in searchbar
            - Activate Reload Button
            - Add DisplayValue variable exemple: https://www.google.com/search?q=test -> www.google.com/search
        - TabBar
            - Add favicon in TabBar of the current page
            - Change title of the tab when the page title change
            - Add sound icon in TabBar when sound is playing
                - OnClick mute the sound
                - Change icon when sound is muted
            - Add loading icon in TabBar when page is loading

## 0.2.1:
    - Fix:
        In PR #12
        - Fix the display of the sound icon in tabBar
        - Fix spinner for loading icon in tabBar
    - Add:
        In PR #12
        - Add BookmarkHandler with IPC communication
            - Add Bookmarks
            <!-- - Remove Bookmarks in context menu (another version) -->
            - Get Bookmarks
            <!-- - Update Bookmarks in context menu (another version) -->
            - Add BookmarkHandler to preload
        - Add IPC Handler
        In PR #13
        - Webcontent event "attach-webview"
            - target blank open in new tab
        - Bookmark open website
            - add two function in routerManager link to webview and tabReducer pass into bookmarkMenu and bookmarkItem


