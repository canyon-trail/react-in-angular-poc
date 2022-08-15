import { AppComponent } from './app.component';
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { AppModule } from './app.module';

describe('AppComponent', () => {
  it('should update react component from angular text entry', async () => {
    await render(AppComponent, { imports: [AppModule] });

    await userEvent.type(document.querySelector(".ng-input")!, "potatoe");

    const reactValue = document.querySelector(".react-value");
    expect(reactValue?.textContent).toContain("potatoe");
  });

  it('should update angular component from react text entry', async () => {
    await render(AppComponent, { imports: [AppModule] });

    await userEvent.type(document.querySelector(".ng-input")!, "derp");

    const reactInput = screen.getByRole("textbox", { name: /React/ });
    await userEvent.click(reactInput);
    await userEvent.paste("potatoe");

    const reactValue = document.querySelector(".ng-value");
    expect(reactValue?.textContent).toContain("potatoe");
  });
});
