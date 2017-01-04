import { SupremeOctoCouscousPage } from './app.po';

describe('supreme-octo-couscous App', function() {
  let page: SupremeOctoCouscousPage;

  beforeEach(() => {
    page = new SupremeOctoCouscousPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
