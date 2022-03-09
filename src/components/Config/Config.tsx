import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectConfigurations } from "../../store/reducers/config";
import { VersionLabel } from './VersionLabel';

export const Config: FC = () => {

    const { value } = useAppSelector(selectConfigurations);

    return (
        <div className="config-container">
            <VersionLabel />
            {
                value &&
                <div className="config-value">
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                </div>
            }
        </div>
    )
}