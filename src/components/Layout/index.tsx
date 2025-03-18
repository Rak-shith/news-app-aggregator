import { ReactNode } from "react";
import { TanStackProvider } from "../../providers/TanStackProvider";
import Header from "../common/Header";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<TanStackProvider>
			<div className="flex flex-col h-screen">
				<Header />
				{children}
			</div>
		</TanStackProvider>
	);
};

export default Layout;
