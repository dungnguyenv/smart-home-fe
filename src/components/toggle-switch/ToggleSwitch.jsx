


import './toggle-switch.css'
import { useState } from "react";


export default function ToggleSwitch({ content, onClick, isChecked }) {
    return (
        <label class="switch-button" for="switch">
            <div class="switch-outer">
                <input id="switch" type="checkbox" onClick={onClick} checked={isChecked} />
                <div class="button">
                    <span class="button-toggle"></span>
                    <span class="button-indicator"></span>
                </div>
            </div>
        </label>
    );
}
