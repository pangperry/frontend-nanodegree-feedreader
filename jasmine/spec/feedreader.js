/* feedreader.js spec file */

$(function () {
    describe('RSS Feeds', function () {

        // tests that allFeeds variable has been defined and is not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // loops through each feed in the allFeeds object and ensures it has a URL defined
        // and that the URL is not empty.
        it('has defined urls', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        // loops through each feed in the allFeeds object and ensures it has a name defined 
        // and that the name is not empty.
        it('has defined names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe("The menu", function () {

        //  ensures the menu element is hidden by default.
        it("is hidden by default", function () {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

        //  ensures the menu changes visibility when the menu icon is clicked. 
        it("becomes visible after hamburger is clicked", function () {
            var $menu = $(".menu-icon-link");
            $menu.trigger('click');
            expect($(document.body).hasClass('menu-hidden')).toBe(false);
            $menu.trigger('click');
        });
    });

    describe("Initial Entries", function () {

        //   ensures when the loadFeed function is called and completes its work, there is at least a 
        //   single .entry element within the .feed container. 
        beforeEach(function (done) {
            initialEntries = $('.entry');
            loadFeed(0, function () {
                try {
                    $entries = $('.entry');
                    done();
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        it("has at least one entry when loadFeed completes", function () {
            expect($entries.length > 0).toBe(true);
        });
    });

    describe("New Feed Selection", function () {
        // asyncronously loads 2 feeds
        beforeEach(function (done) {
            loadFeed(0, function () {
                try {
                    $entries = $('.entry');
                    loadFeed(1, function () {
                        try {
                            $newEntries = $('.entry');
                            done();
                        } catch (e) {
                            done.fail(e);
                        }
                    });
                } catch (e) {
                    done.fail(e);
                }
            });
        });

        // ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        // the two necessary async calls to loadFeed are handled in the beforeEach function above
        it("loads new content", function () {
            expect($($entries[0]).innerText !== $($newEntries[0]).innerText);
        });

    });
}());






///LOOK AT HOW LOADFEED WAS USED IN THE main app, and rethink the tests (at least the last one or two)