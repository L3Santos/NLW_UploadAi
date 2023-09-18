import { Separator } from "@radix-ui/react-separator";
import { Button } from "./components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";

export function App() {

  return (
    <div className="min-h-screen flex flex-col">
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">Upload.Ai</h1>

      <div className="flex items-center gap-3">
        <Button style={{borderRadius: "5px"}} variant="outline">
          <Github className="w-4 h-4 mr-2"/>
          GitHub
          </Button>
      </div>
    </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              className="resize-none p-5 leading-relaxed text-center"
              placeholder="Inclua o prompt para a IA..."
              />
            <Textarea 
              className="resize-none p-5 leading-relaxed text-center"
              placeholder="Resultado gerado pela a IA..." 
              readOnly
              />
          </div>

          <p className="text-sm text-muted-foreground">Lembre-se:<br/>
          Você pode ultilizar a variável<code className="text-violet-400"> transcription </code>
          no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado!
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={function (id: string): void {
            throw new Error("Function not implemented.");
          } }/>
        
          <Separator/>
          
          <form className="space-y-6 text-center">
            <div className="space-y-2 text-center">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={function (template: string): void {
                  throw new Error("Function not implemented.");
                } }/>
              </div>
              
            <div className="space-y-2 text-center">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-Turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span  className="block text-xs text-muted-foreground">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <SelectSeparator/>
            <div className="space-y-2 text-center">
              <Label>Criatividade</Label>
              <Slider 
                min={0}
                max={1}
                step={0.1}
              >
              </Slider>
              <span  className="block text-xs text-muted-foreground leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>
            <SelectSeparator/>
            <Button type="submit" className="w-full" style={{borderRadius:"10px"}}>
              Execultar
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}