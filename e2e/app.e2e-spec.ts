import { ChatroomPage } from './app.po';

describe('chatroom App', function() {
  let page: ChatroomPage;

  beforeEach(() => {
    page = new ChatroomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
