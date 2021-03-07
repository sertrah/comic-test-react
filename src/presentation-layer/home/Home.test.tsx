import React from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { NotificationProvider } from "application/contexts";
import Home from "./Home";

const queryClient = new QueryClient();

describe("Home tests", () => {


  it("renders well", () => {
    const component = render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Home />{" "}
        </NotificationProvider>
      </QueryClientProvider>
    );
    expect(component.container).toMatchSnapshot();
  });
});
