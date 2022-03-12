import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectConfigurations } from "../../store/reducers/config";
import { Header } from "./Header";

export const Config: FC = () => {

    const { value } = useAppSelector(selectConfigurations);

    return (
        <div className="config-container">
            <Header />
            {
                value &&
                <div className="config-value">
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                </div>
            }
        </div>
    )
}