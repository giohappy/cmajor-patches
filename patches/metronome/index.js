
/*
    This simple web component just manually creates a set of plain sliders for the
    known parameters, and uses some listeners to connect them to the patch.
*/
class MetronomeGUI extends HTMLElement
{
    constructor (patchConnection)
    {
        super();
        this.patchConnection = patchConnection;
        this.classList = "metronome-ui-element";
        this.innerHTML = this.getHTML();
    }

    connectedCallback()
    {
        this.updateBpm = (value) =>
        {
            const slider = this.querySelector ("#bpm");

            if (slider) {
                slider.innerHTML = value;
            }
        };

        this.updatePosition = (p) =>
        {
            const slider = this.querySelector ("#frame");

            if (slider) {
                slider.innerHTML = p.frameIndex;
            }
        };
        this.patchConnection.addEndpointListener  ('bpm', this.updateBpm);
        this.patchConnection.addEndpointListener  ('positionOut', this.updatePosition);

    }

    disconnectedCallback()
    {
        this.patchConnection.removeEndpointListener ("bpm", this.updateBpm);
        this.patchConnection.removeEndpointListener ("position", this.updatePosition);
    }

    getHTML()
    {
        return `
        <style>
            .metronome-ui-element {
                background: #333333;
                display: block;
                width: 100%;
                height: 100%;
                padding: 10px;
                overflow: auto;
            }

            .control > span{
                color: white;
                margin: 10px;
            }
        </style>

        <div id="controls">
          <div class='control'><span id="bpm"></span><span>BPM</span></div>
          <div class='control'><span id="frame"></span><span>frame</span></div>
        </div>`;
    }
}

window.customElements.define ("metronome-view", MetronomeGUI);

/* This is the function that a host (the command line patch player, or a Cmajor plugin
   loader, or our VScode extension, etc) will call in order to create a view for your patch.

   Ultimately, a DOM element must be returned to the caller for it to append to its document.
   However, this function can be `async` if you need to perform asyncronous tasks, such as
   fetching remote resources for use in the view, before completing.

   When using libraries such as React, this is where the call to `ReactDOM.createRoot` would
   go, rendering into a container component before returning.
*/
export default function createPatchView (patchConnection)
{
    return new MetronomeGUI (patchConnection);
}
