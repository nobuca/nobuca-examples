import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlTimelineView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlTimeline";
        this.setNativeElement(div);
        this.createLeftSidebar()
        this.createHeaderAndBody();
        this.createRightSidebar()
    }

    createLeftSidebar() {
        this.divLeftSidebar = document.createElement("div");
        this.divLeftSidebar.className = "BlenderControlTimelineLeftSidebar";
        this.getNativeElement().appendChild(this.divLeftSidebar);
        //this.createChannels();
    }

    createRightSidebar() {
        this.divRightSidebar = document.createElement("div");
        this.divRightSidebar.className = "BlenderControlTimelineRightSidebar";
        this.getNativeElement().appendChild(this.divRightSidebar);
    }

    createHeaderAndBody() {
        this.divHeaderAndBody = document.createElement("div");
        this.divHeaderAndBody.className = "BlenderControlTimelineHeaderAndBody";
        this.getNativeElement().appendChild(this.divHeaderAndBody);
        this.createHeader();
        this.createBody();
    }

    getDivHeaderAndBody() {
        return this.divHeaderAndBody;
    }

    createHeader() {
        this.divHeader = document.createElement("div");
        this.divHeader.className = "BlenderControlTimelineHeader";
        this.getDivHeaderAndBody().appendChild(this.divHeader);
    }

    getDivHeader() {
        return this.divHeader;
    }

    setColumnWidth(columnWidth) {
        this.columnWidth = columnWidth;
    }

    getColumnWidth() {
        return this.columnWidth;
    }

    getCenterFrame() {
        return this.centerFrame;
    }

    setCenterFrame(centerFrame) {
        this.centerFrame = centerFrame;
    }

    getFirstFrame() {
        return this.firstFrame;
    }

    setFirstFrame(firstFrame) {
        this.firstFrame = firstFrame;
    }

    getLastFrame() {
        return this.lastFrame;
    }

    setLastFrame(lastFrame) {
        this.lastFrame = lastFrame;
    }

    getFramesPerColumn() {
        return this.framesPerColumn;
    }

    setFramesPerColumn(framesPerColumn) {
        this.framesPerColumn = framesPerColumn;
    }

    increaseFramesPerColumn() {
        if (this.getFramesPerColumn() == 1) {
            this.setFramesPerColumn(2);
        } else if (this.getFramesPerColumn() == 2) {
            this.setFramesPerColumn(5);
        } else if (this.getFramesPerColumn() == 5) {
            this.setFramesPerColumn(10);
        } else if (this.getFramesPerColumn() == 10) {
            this.setFramesPerColumn(20);
        } else if (this.getFramesPerColumn() == 20) {
            this.setFramesPerColumn(50);
        } else if (this.getFramesPerColumn() == 50) {
            this.setFramesPerColumn(100);
        } else if (this.getFramesPerColumn() == 100) {
            this.setFramesPerColumn(200);
        } else if (this.getFramesPerColumn() == 200) {
            this.setFramesPerColumn(500);
        } else if (this.getFramesPerColumn() == 500) {
            this.setFramesPerColumn(1000);
        } else if (this.getFramesPerColumn() == 1000) {
            this.setFramesPerColumn(2000);
        } else if (this.getFramesPerColumn() == 2000) {
            this.setFramesPerColumn(5000);
        } else if (this.getFramesPerColumn() == 5000) {
            this.setFramesPerColumn(10000);
        } else if (this.getFramesPerColumn() == 10000) {
            this.setFramesPerColumn(20000);
        }
    }

    decreaseFramesPerColumn() {
        if (this.getFramesPerColumn() == 2) {
            this.setFramesPerColumn(1);
        } else if (this.getFramesPerColumn() == 5) {
            this.setFramesPerColumn(2);
        } else if (this.getFramesPerColumn() == 10) {
            this.setFramesPerColumn(5);
        } else if (this.getFramesPerColumn() == 20) {
            this.setFramesPerColumn(10);
        } else if (this.getFramesPerColumn() == 50) {
            this.setFramesPerColumn(20);
        } else if (this.getFramesPerColumn() == 100) {
            this.setFramesPerColumn(50);
        } else if (this.getFramesPerColumn() == 200) {
            this.setFramesPerColumn(100);
        } else if (this.getFramesPerColumn() == 500) {
            this.setFramesPerColumn(200);
        } else if (this.getFramesPerColumn() == 1000) {
            this.setFramesPerColumn(500);
        } else if (this.getFramesPerColumn() == 2000) {
            this.setFramesPerColumn(1000);
        } else if (this.getFramesPerColumn() == 5000) {
            this.setFramesPerColumn(2000);
        } else if (this.getFramesPerColumn() == 10000) {
            this.setFramesPerColumn(5000);
        } else if (this.getFramesPerColumn() == 20000) {
            this.setFramesPerColumn(10000);
        }
    }

    createBody() {
        this.divBody = document.createElement("div");
        this.divBody.className = "BlenderControlTimelineBody";
        this.getDivHeaderAndBody().appendChild(this.divBody);

        this.divBody.addEventListener("wheel", (event) => {

            var newColumnWidth = this.getColumnWidth();

            if (event.deltaY > 0) {
                if (this.getFramesPerColumn() > 1) {
                    newColumnWidth -= 10;
                }
            } else if (event.deltaY < 0) {
                newColumnWidth += 10;
            }

            if (newColumnWidth > 140) {
                this.increaseFramesPerColumn();
                newColumnWidth = 75;
            } else if (newColumnWidth < 40) {
                this.decreaseFramesPerColumn();
                newColumnWidth = 75;
            }

            this.setColumnWidth(newColumnWidth);

            this.createNumbersAndColumns();
        });

        //this.createPlayhead();
        //this.createKeyframes();
        this.createScrollbar();
    }

    createNumbersAndColumns() {

        if (this.getDivBody().offsetWidth <= 0) return;

        this.removeNumbersAndColumns();

        this.divNumbers = [];
        this.divColumns = [];

        var numberOfColumns = Math.floor(this.getDivBody().offsetWidth / this.getColumnWidth());
        var centerFrame = this.getCenterFrame();
        var centerX = Math.floor(this.getDivBody().offsetWidth / 2);
        centerX -= Math.floor(this.getColumnWidth() / 2);

        var framesAtSides = Math.floor((numberOfColumns * this.getFramesPerColumn()) / 2);
        var firstFrame = centerFrame - framesAtSides;
        var lastFrame = centerFrame + framesAtSides;

        var currentX = centerX;
        for (var frame = centerFrame; frame < lastFrame; frame += this.getFramesPerColumn()) {
            this.createNumberAndColumn(frame, currentX);
            currentX += this.getColumnWidth();
        }
        currentX = centerX - this.getColumnWidth();
        for (var frame = centerFrame - 1; frame >= firstFrame; frame -= this.getFramesPerColumn()) {
            this.createNumberAndColumn(frame, currentX);
            currentX -= this.getColumnWidth();
        }
    }

    createNumberAndColumn(frame, currentX) {

        var divNumber = document.createElement("div");
        divNumber.className = "BlenderControlTimelineFrameColumnHeaderNumber";
        divNumber.innerHTML = frame;
        divNumber.style.left = currentX + "px";
        divNumber.style.minWidth = this.getColumnWidth() + "px";
        divNumber.style.maxWidth = this.getColumnWidth() + "px";
        this.getDivHeader().appendChild(divNumber);

        this.getDivNumbers().push(divNumber);

        var divColumn = document.createElement("div");
        divColumn.className = "BlenderControlTimelineBodyColumn";
        divColumn.style.left = currentX + "px";
        divColumn.style.minWidth = this.getColumnWidth() + "px";
        divColumn.style.maxWidth = this.getColumnWidth() + "px";
        this.getDivBody().appendChild(divColumn);

        this.getDivColumns().push(divColumn);

        var divColumnHalf = document.createElement("div");
        divColumnHalf.className = "BlenderControlTimelineBodyColumnHalf";
        divColumnHalf.style.minWidth = (this.getColumnWidth() / 2) + "px";
        divColumnHalf.style.maxWidth = (this.getColumnWidth() / 2) + "px";
        divColumn.appendChild(divColumnHalf);

        divColumn.divColumnHalf = divColumnHalf;
    }

    removeNumbersAndColumns() {
        if (this.getDivNumbers() == null) return;
        for (var i = 0; i < this.getDivNumbers().length; i++) {
            var divNumber = this.getDivNumbers()[i];
            divNumber.parentNode.removeChild(divNumber);
            var divColumn = this.getDivColumns()[i];
            divColumn.parentNode.removeChild(divColumn);
        }
        this.divNumbers = [];
        this.divColumns = [];
    }

    getDivNumbers() {
        return this.divNumbers;
    }

    getDivColumns() {
        return this.divColumns;
    }

    getDivBody() {
        return this.divBody;
    }


    createScrollbar() {
        this.divScrollbar = document.createElement("div");
        this.divScrollbar.className = "BlenderControlTimelineBodyScrollbar";
        this.getDivHeaderAndBody().appendChild(this.divScrollbar);

        this.divScrollbarLeft = document.createElement("div");
        this.divScrollbarLeft.className = "BlenderControlTimelineBodyScrollbarLeft";
        this.getDivScrollbar().appendChild(this.divScrollbarLeft);

        this.divScrollbarRight = document.createElement("div");
        this.divScrollbarRight.className = "BlenderControlTimelineBodyScrollbarRight";
        this.getDivScrollbar().appendChild(this.divScrollbarRight);

        this.getDivScrollbarLeft().addEventListener("mousedown", (event) => {
            console.log("scrollbar left mouse down x=" + event.x);
            this.beginDragScrollbarLeft(event);
        })

        this.getDivScrollbarRight().addEventListener("mousedown", (event) => {
            console.log("scrollbar right mouse down x=" + event.x);
            this.beginDragScrollbarRight(event);
        })

        this.getDivScrollbar().addEventListener("mousedown", (event) => {
            console.log("scrollbar  mouse down x=" + event.x);
            this.beginDragScrollbar(event);
        })
    }

    getDivScrollbar() {
        return this.divScrollbar;
    }

    getDivScrollbarLeft() {
        return this.divScrollbarLeft;
    }

    getDivScrollbarRight() {
        return this.divScrollbarRight;
    }

    beginDragScrollbar(event) {
        if (BlenderControlTimelineView.timelineScrollbarLeftDragged != null) return;
        if (BlenderControlTimelineView.timelineScrollbarRightDragged != null) return;
        console.log("scrollbar beginDragScrollbar");
        BlenderControlTimelineView.timelineScrollbarDragged = this;
        BlenderControlTimelineView.timelineScrollbarDraggedOffsetX = event.x - this.getDivScrollbar().offsetLeft;
    }

    endDragScrollbar(event) {
        console.log("scrollbar endDragScrollbar");
        BlenderControlTimelineView.timelineScrollbarDragged = null;
    }

    beginDragScrollbarLeft(event) {
        if (BlenderControlTimelineView.timelineScrollbarDragged != null) return;
        if (BlenderControlTimelineView.timelineScrollbarRightDragged != null) return;
        console.log("scrollbar beginDragScrollbarLeft");
        this.endDragScrollbar(event);
        BlenderControlTimelineView.timelineScrollbarLeftDragged = this;
        BlenderControlTimelineView.timelineScrollbarLeftDraggedOffsetX = event.x;
        BlenderControlTimelineView.timelineScrollbarLeftDraggedBeginLeft = this.getDivScrollbar().offsetLeft;
        BlenderControlTimelineView.timelineScrollbarLeftDraggedBeginWidth = this.getDivScrollbar().offsetWidth;
    }

    endDragScrollbarLeft(event) {
        console.log("scrollbar endDragScrollbarLeft");
        BlenderControlTimelineView.timelineScrollbarLeftDragged = null;
    }

    beginDragScrollbarRight(event) {
        if (BlenderControlTimelineView.timelineScrollbarDragged != null) return;
        if (BlenderControlTimelineView.timelineScrollbarLeftDragged != null) return;
        console.log("scrollbar beginDragScrollbarRight");
        this.endDragScrollbar(event);
        BlenderControlTimelineView.timelineScrollbarRightDragged = this;
        BlenderControlTimelineView.timelineScrollbarRightDraggedOffsetX = event.x;
        BlenderControlTimelineView.timelineScrollbarRightDraggedBeginLeft = this.getDivScrollbar().offsetLeft;
        BlenderControlTimelineView.timelineScrollbarRightDraggedBeginWidth = this.getDivScrollbar().offsetWidth;
    }

    endDragScrollbarRight(event) {
        console.log("scrollbar endDragScrollbarRight");
        BlenderControlTimelineView.timelineScrollbarRightDragged = null;
    }

    updateContentsPositionAndSize() {

        var width = this.getDivBody().offsetWidth;
        if (width <= 0) return;

        if (this.getCenterFrame() == null) {
            this.setFramesPerColumn(5);
            this.setColumnWidth(50);
            this.setCenterFrame(100);
        }

        var centerX = Math.floor(this.getDivBody().offsetWidth / 2);
        //centerX -= Math.floor(this.getColumnWidth() / 2);
        var scrollbarLeft = centerX;
        scrollbarLeft -= Math.floor(this.getDivScrollbar().offsetWidth/2); 
        this.getDivScrollbar().style.left = scrollbarLeft + "px";

        this.createNumbersAndColumns();
    }
}

window.addEventListener("mousemove", (event) => {
    if (BlenderControlTimelineView.timelineScrollbarDragged != null) {
        var newX = event.x - BlenderControlTimelineView.timelineScrollbarDraggedOffsetX;
        BlenderControlTimelineView.timelineScrollbarDragged.getDivScrollbar().style.left = newX + "px";
    }
    if (BlenderControlTimelineView.timelineScrollbarLeftDragged != null) {
        var deltaX = event.x - BlenderControlTimelineView.timelineScrollbarLeftDraggedOffsetX;
        var newLeft = BlenderControlTimelineView.timelineScrollbarLeftDraggedBeginLeft + deltaX;
        var newWidth = BlenderControlTimelineView.timelineScrollbarLeftDraggedBeginWidth - deltaX;
        BlenderControlTimelineView.timelineScrollbarLeftDragged.getDivScrollbar().style.left = newLeft + "px";

        if (newWidth >= 30) {
            BlenderControlTimelineView.timelineScrollbarLeftDragged.getDivScrollbar().style.width = newWidth + "px";
            console.log("newWidth:" + newWidth);
        }
    }
    if (BlenderControlTimelineView.timelineScrollbarRightDragged != null) {
        var deltaX = event.x - BlenderControlTimelineView.timelineScrollbarRightDraggedOffsetX;
        var newWidth = BlenderControlTimelineView.timelineScrollbarRightDraggedBeginWidth + deltaX;
        if (newWidth >= 30 || newWidth > BlenderControlTimelineView.timelineScrollbarRightDraggedBeginWidth) {
            BlenderControlTimelineView.timelineScrollbarRightDragged.getDivScrollbar().style.width = newWidth + "px";
            console.log("newWidth:" + newWidth);
        } else {
            var newLeft = BlenderControlTimelineView.timelineScrollbarRightDraggedBeginLeft - deltaX;
            BlenderControlTimelineView.timelineScrollbarRightDragged.getDivScrollbar().style.left = newLeft + "px";
        }
    }
});

window.addEventListener("mouseup", (event) => {
    if (BlenderControlTimelineView.timelineScrollbarDragged != null) {
        BlenderControlTimelineView.timelineScrollbarDragged.endDragScrollbar(event);
    }
    if (BlenderControlTimelineView.timelineScrollbarLeftDragged != null) {
        BlenderControlTimelineView.timelineScrollbarLeftDragged.endDragScrollbarLeft(event);
    }
    if (BlenderControlTimelineView.timelineScrollbarRightDragged != null) {
        BlenderControlTimelineView.timelineScrollbarRightDragged.endDragScrollbarRight(event);
    }
});